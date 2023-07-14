import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findUserByEmail(email: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: email,
                },
            });
            return user;
        } catch (error) {
            return null;
        }
    }

    async createOAuthUser(accessToken: string, refreshToken: string, profile: Profile) {
        const userDisplayName = profile.displayName ? profile.displayName : null;
        const userPhotoURL = profile.photos ? profile.photos[0].value : null;

        const createdUser = await this.prismaService.user.create({
            data: {
                displayName: userDisplayName,
                email: profile.emails[0].value,
                photoURL: userPhotoURL,
                providerAccounts: {
                    create: {
                        provider: profile.provider,
                        providerAccountId: profile.id,
                        providerRefreshToken: refreshToken,
                        providerAccessToken: accessToken,
                    },
                },
            },
        });

        return createdUser;
    }

    async updateRefreshToken(uid: string, refreshToken: string) {
        try {
            const updatedUser = await this.prismaService.user.update({
                where: {
                    uid: uid,
                },
                data: {
                    refreshToken: refreshToken,
                },
            });

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}
