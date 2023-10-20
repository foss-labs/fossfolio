import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { USER_UPDATE_ERROR } from 'src/error';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { fakerEN } from '@faker-js/faker';

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

    async findUserBySlug(slug: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    slug,
                },
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    async createOAuthUser(accessToken: string, refreshToken: string, profile: Profile) {
        const userDisplayName = profile.displayName ? profile.displayName : null;
        const userPhotoURL = profile.photos ? profile.photos[0].value : null;

        let slug: string;
        while (true) {
            slug = this.generateSlug();
            const user = await this.findUserBySlug(slug);
            if (user) continue;
            break;
        }
        const createdUser = await this.prismaService.user.create({
            data: {
                displayName: userDisplayName,
                email: profile.emails[0].value,
                photoURL: userPhotoURL,
                slug,
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

    async updateRefreshToken(uid: string, refreshToken: string | null) {
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

    async findUserById(uid: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    uid: uid,
                },
            });

            return user;
        } catch (error) {
            return null;
        }
    }

    async updateUser(authUser: User, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.prismaService.user.update({
                where: {
                    uid: authUser.uid,
                },
                data: {
                    slug: updateUserDto.slug ? updateUserDto.slug : authUser.slug,
                    photoURL: updateUserDto.photoUrl ? updateUserDto.photoUrl : authUser.photoURL,
                    displayName: updateUserDto.displayName
                        ? updateUserDto.displayName
                        : authUser.displayName,
                },
            });
            return user;
        } catch (error) {
            return USER_UPDATE_ERROR;
        }
    }

    generateSlug() {
        return fakerEN.lorem.slug({
            min: 1,
            max: 2,
        });
    }
}
