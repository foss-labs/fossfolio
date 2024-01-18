import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ORG_MEMBER_NOT_FOUND, ROLE_UPDATE_FAILED } from '../error';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationMemberService {
    constructor(private readonly prismaService: PrismaService) {}

    async getMembers(organizationId: string) {
        const members = await this.prismaService.organizationMember.findMany({
            where: {
                organizationId,
            },
            select: {
                user: {
                    select: {
                        uid: true,
                        email: true,
                        displayName: true,
                        slug: true,
                    },
                },
                role: true,
            },
        });

        return members;
    }

    async findMember(organizationId: string, userUid: string) {
        const member = await this.prismaService.organizationMember.findUnique({
            where: {
                userUid_organizationId: {
                    userUid,
                    organizationId,
                },
            },
        });

        if (member) return member;
        return ORG_MEMBER_NOT_FOUND;
    }

    async removeMember(organizationId: string, userUid: string) {
        try {
            const member = await this.prismaService.organizationMember.findUnique({
                where: {
                    userUid_organizationId: {
                        userUid,
                        organizationId,
                    },
                },
            });

            if (!member) throw new NotFoundException();

            await this.prismaService.organizationMember.delete({
                where: {
                    id: member.id,
                },
            });

            return {
                ok: true,
                message: 'User removed successfully',
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ORG_MEMBER_NOT_FOUND,
                });
            } else {
                return e;
            }
        }
    }

    async updateRole(organizationId: string, userUid: string, role: Role) {
        const newRole = await this.prismaService.organizationMember.update({
            where: {
                userUid_organizationId: {
                    userUid,
                    organizationId,
                },
            },
            data: {
                role,
            },
        });

        if (!newRole) return ROLE_UPDATE_FAILED;

        return newRole;
    }
}
