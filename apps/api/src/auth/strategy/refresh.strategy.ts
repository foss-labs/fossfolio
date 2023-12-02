import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

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
                    let data = request?.cookies['refresh_token'];
                    if (!data) {
                        throw new UnauthorizedException('REFRESH_TOKEN_NOT_FOUND');
                    }
                    return data;
                },
            ]),
        });
    }

    async validate(req: Request, payload: any) {
        if (!payload) {
            throw new BadRequestException('PAYLOAD_NOT_FOUND');
        }
        let user = await this.userService.findUserById(payload.sub);

        if (!user) {
            throw new BadRequestException('INVALID_USER');
        }

        return user;
    }
}
