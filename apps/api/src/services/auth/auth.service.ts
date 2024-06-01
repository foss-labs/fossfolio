import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import type { Profile } from 'passport';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	async checkIfProviderAccountExists(OAuthUserData: Profile) {
		const provider = await this.prismaService.account.findUnique({
			where: {
				verify_provider_account: {
					provider: OAuthUserData.provider,
					providerAccountId: OAuthUserData.id,
				},
			},
		});

		if (!provider) return null;

		return provider;
	}

	async createProviderAccount(
		user: User,
		profile: Profile,
		accessToken: string,
		refreshToken: string,
	) {
		try {
			const createdProviderAccount = await this.prismaService.account.create({
				data: {
					provider: profile.provider,
					providerAccountId: profile.id,
					providerAccessToken: accessToken,
					providerRefreshToken: refreshToken,
					user: {
						connect: {
							uid: user.uid,
						},
					},
				},
			});

			return createdProviderAccount;
		} catch (error) {
			return null;
		}
	}

	async generateAuthToken(uid: string) {
		const payload = {
			iss: this.configService.get('API_BASE_URL'),
			sub: uid,
			iat: new Date().getTime(),
		};

		const accessToken = await this.jwtService.signAsync(payload);
		const refreshToken = await this.generateRefreshToken(uid);

		return {
			accessToken,
			refreshToken,
		};
	}

	async generateRefreshToken(uid: string) {
		const payload = {
			sub: uid,
			iss: this.configService.get('API_BASE_URL'),
			iat: new Date().getTime(),
		};
		const refreshToken = await this.jwtService.signAsync(payload);

		const hashedRefreshToken = await hash(refreshToken);

		const updatedUser = await this.userService.updateRefreshToken(
			uid,
			hashedRefreshToken,
		);

		if (!updatedUser) throw new Error('REFRESH_TOKEN_NOT_UPDATED');

		return refreshToken;
	}

	async refreshAuthToken(user: User, hashedToken: string) {
		if (!user) throw new Error('USER_NOT_FOUND');

		const isRefreshTokenValid = await verify(user.refreshToken, hashedToken);

		if (!isRefreshTokenValid)
			throw new Error('AFTER_GENERATION_INVALID_REFRESH_TOKEN');

		return await this.generateAuthToken(user.uid);
	}
}
