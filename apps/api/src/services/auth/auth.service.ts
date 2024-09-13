import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import type { Profile } from 'passport';
import { User } from '@api/db/schema';
import { AccountModel, UserModel } from '@api/models';
import { FFError } from '@api/utils/error';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
	oauthClient: OAuth2Client;
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		this.oauthClient = new OAuth2Client();
	}

	async verifyGoogleId(id: string) {
		try {
			const ticket = await this.oauthClient.verifyIdToken({
				idToken: id,
				audience: this.configService.get('GOOGLE_CLIENT_ID'),
			});
			const payload = ticket.getPayload();
			if (!payload) throw new UnauthorizedException();
			const userid = payload['sub'];

			const authTokens = await this.generateAuthToken(userid);
			await this.createGoogleAccountViaMobileAuth(
				authTokens.accessToken,
				authTokens.refreshToken,
				payload,
			);

			return authTokens;
		} catch {
			throw new UnauthorizedException();
		}
	}

	async checkIfProviderAccountExists(OAuthUserData: Profile) {
		const provider = await AccountModel.find({
			provider: OAuthUserData.provider,
			provider_account_id: OAuthUserData.id,
		});

		if (!provider || !provider.length) return null;
		return provider[0];
	}

	async createProviderAccount(
		user: User,
		profile: Profile,
		accessToken: string,
		refreshToken: string,
	) {
		const account = await AccountModel.insert({
			provider: profile.provider,
			provider_account_id: profile.id,
			provider_access_token: accessToken,
			provider_refresh_token: refreshToken,
			fk_user_id: user.id,
		});

		return account;
	}

	async generateAuthToken(id: string) {
		const payload = {
			iss: this.configService.get('API_BASE_URL'),
			sub: id,
			iat: new Date().getTime(),
		};

		const accessToken = await this.jwtService.signAsync(payload);
		const refreshToken = await this.generateRefreshToken(id);

		return {
			accessToken,
			refreshToken,
		};
	}

	async generateRefreshToken(id: string) {
		const payload = {
			sub: id,
			iss: this.configService.get('API_BASE_URL'),
			iat: new Date().getTime(),
		};
		const refreshToken = await this.jwtService.signAsync(payload);

		const hashedRefreshToken = await hash(refreshToken);

		await UserModel.update({ id: id }, { refresh_token: hashedRefreshToken });

		return refreshToken;
	}

	async refreshAuthToken(user: User, hashedToken: string) {
		if (!user) throw new Error('USER_NOT_FOUND');

		const isRefreshTokenValid = await verify(user.refresh_token, hashedToken);

		if (!isRefreshTokenValid) FFError.unauthorized('Invalid refresh token');

		return await this.generateAuthToken(user.id);
	}

	async createGoogleAccountViaMobileAuth(
		accessToken: string,
		refreshToken: string,
		profile: TokenPayload,
	) {
		const email = profile.email;

		if (!email) {
			// If the user doesn't have an email, return an error
			throw new NotFoundException();
		}

		// Check whether this user exist in the database or not
		const user = await UserModel.findUserByEmail(email);

		const profilePayLoad = {
			displayName: profile.given_name,
			photos: profile.picture,
			id: profile.sub,
			accessToken,
			refreshToken,
			provider: 'google',
		} as Profile;

		// If the user doesn't exist in the database, create a new user
		if (!user) {
			return await this.userService.createOAuthUser(
				accessToken,
				refreshToken,
				profilePayLoad,
				email,
			);
		}

		// If the user already exists, check if the user has a provider account
		const providerAccount =
			await this.checkIfProviderAccountExists(profilePayLoad);

		// If the user doesn't have a provider account, create a new provider account
		if (!providerAccount) {
			await this.createProviderAccount(
				user,
				profilePayLoad,
				accessToken,
				refreshToken,
			);
		}

		return user;
	}
}
