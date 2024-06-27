import { type Profile, Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '@api/models/User';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UserService,
		configService: ConfigService,
	) {
		super({
			clientID: configService.get('GITHUB_CLIENT_ID'),
			clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
			callbackURL: configService.get('GITHUB_CALLBACK_URL'),
			scope: [configService.get('GITHUB_SCOPE')],
			store: true,
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done,
	) {
		const email = profile.emails?.[0].value;

		if (!email) {
			// If the user doesn't have an email, return an error
			return done(null, false);
		}

		// Check whether this user exist in the database or not
		const user = await UserModel.findUserByEmail(email);

		// If the user doesn't exist in the database, create a new user
		if (!user) {
			const createdUser = await this.usersService.createOAuthUser(
				accessToken,
				refreshToken,
				profile,
				email,
			);
			return createdUser;
		}

		// If the user already exists, check if the user has a provider account
		const providerAccount =
			await this.authService.checkIfProviderAccountExists(profile);

		// If the user doesn't have a provider account, create a new provider account
		if (!providerAccount) {
			await this.authService.createProviderAccount(
				user,
				profile,
				accessToken,
				refreshToken,
			);
		}

		return user;
	}
}
