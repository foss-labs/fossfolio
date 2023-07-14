import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { Profile } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
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
            uid,
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
            uid,
        };
        const refreshToken = await this.jwtService.signAsync(payload);

        const hashedRefreshToken = await hash(refreshToken);

        const updatedUser = await this.userService.updateRefreshToken(uid, hashedRefreshToken);

        if (!updatedUser) throw new Error('Unable to update user refresh token');

        return refreshToken;
    }
}
