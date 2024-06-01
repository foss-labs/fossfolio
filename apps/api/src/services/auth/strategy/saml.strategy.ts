import { MultiSamlStrategy } from '@node-saml/passport-saml';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { PrismaService } from '../../prisma.service';
import type { StrategyOptionsCallback } from '@node-saml/passport-saml/lib/types';
import type e from 'express';

@Injectable()
export class SamlStrategy extends PassportStrategy(MultiSamlStrategy, 'saml') {
	constructor(
		private readonly authService: AuthService,
		private readonly prismaService: PrismaService,
		private readonly usersService: UserService,
	) {
		super({
			passReqToCallback: true,
			getSamlOptions: async (
				req: e.Request,
				callback: StrategyOptionsCallback,
			) => {
				const issuer = req.query.issuer;
				if (!issuer || typeof issuer !== 'string') {
					return callback(new Error('Issuer not found'));
				}
				const config = await this.prismaService.samlConfig.findUnique({
					where: { issuer: issuer },
				});
				if (!config) {
					return callback(new Error('SAML config not found'));
				}
				return callback(null, config);
			},
		});
	}

	async validate(profile, done) {
		// Check whether this user exist in the database or not
		console.log(profile);
		const user = await this.prismaService.user.findUnique({
			where: {
				email:
					typeof profile.email === 'string' ? profile.email : profile.email[0],
			},
		});

		// If the user doesn't exist in the database, create a new user
		if (!user) {
			const createdUser = await this.usersService.createOAuthUser(
				profile.nameID,
				profile.nameID,
				profile,
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
				profile.email,
				profile.email,
			);
		}

		return user;
	}
}
