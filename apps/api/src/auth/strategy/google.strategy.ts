import { Profile, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: (configService.get('GOOGLE_SCOPE') as string).split(','),
            store: true,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done) {
        // Check whether this user exist in the database or not
        const user = await this.usersService.findUserByEmail(profile.emails[0].value);

        // If the user doesn't exist in the database, create a new user
        if (!user) {
            const createdUser = await this.usersService.createOAuthUser(
                accessToken,
                refreshToken,
                profile,
            );
            return createdUser;
        }

        // If the user already exists, check if the user has a provider account
        const providerAccount = await this.authService.checkIfProviderAccountExists(profile);

        // If the user doesn't have a provider account, create a new provider account
        if (!providerAccount) {
            await this.authService.createProviderAccount(user, profile, accessToken, refreshToken);
        }

        return user;
    }
}
