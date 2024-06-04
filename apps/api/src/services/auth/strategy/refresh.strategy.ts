import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FFError } from '@api/utils/error';
import { UserModel } from '@api/models';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(configService: ConfigService) {
		super({
			ignoreExpiration: true,
			passReqToCallback: true,
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const data = request?.cookies.refresh_token;
					if (!data) {
						FFError.unauthorized('Invalid refresh token');
					}
					return data;
				},
			]),
		});
	}

	async validate(
		_req: Request,
		payload: {
			sub: string;
			iat: number;
			exp: number;
		},
	) {
		const user = await UserModel.findById(payload.sub);
		if (!user) {
			FFError.unauthorized('Invalid refresh token');
		}

		return user;
	}
}
