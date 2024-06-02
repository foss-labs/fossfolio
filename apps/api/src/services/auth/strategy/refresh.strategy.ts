import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user.service';
import { FFError } from '@api/utils/error';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(
		private userService: UserService,
		private readonly configService: ConfigService,
	) {
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

	async validate(req: Request, payload: any) {
		const user = await this.userService.findUserById(payload.sub);

		if (!user) {
			throw new BadRequestException('INVALID_USER');
		}

		return user;
	}
}
