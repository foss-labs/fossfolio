import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@api/services/user.service';
import { FFError } from '@api/utils/error';
import { UserModel } from '@api/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const data = request?.cookies.access_token;
					if (!data) {
						FFError.unauthorized('Access Token not found');
					}
					return data;
				},
			]),
		});
	}

	async validate(payload: {
		iss: string;
		sub: string;
		iat: number;
	}) {
		const user = await UserModel.findById(payload.sub);

		console.log(user)

		if (!user) {
			FFError.unauthorized('Invalid user');
		}
		return user;
	}
}
