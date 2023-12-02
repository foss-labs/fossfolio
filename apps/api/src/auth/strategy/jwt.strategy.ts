import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

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
                    let data = request?.cookies['access_token'];
                    if (!data) {
                        throw new UnauthorizedException('ACCESS_TOKEN_NOT_FOUND');
                    }
                    return data;
                },
            ]),
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('INVALID_USER');
        }
        return user;
    }
}
