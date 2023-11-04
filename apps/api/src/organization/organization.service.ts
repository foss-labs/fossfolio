import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { ORG_EXISTS, ORG_NOT_FOUND } from 'src/error';
import { UpdateOrgDto } from './dto/update-org.dto';
import { Role } from '@prisma/client';

@Injectable()
export class OrganizationService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrgDto: CreateOrgDto, uid: string) {
        try {
            const { name, slug } = createOrgDto;

            const org = await this.prismaService.organization.create({
                data: {
                    name,
                    slug,
                    members: {
                        create: {
                            role: 'ADMIN',
                            userUid: uid,
                        },
                    },
                },
            });

            return org;
        } catch (error) {
            return ORG_EXISTS;
        }
    }

    async findOrgBySlug(slug: string) {
        const org = await this.prismaService.organization.findUnique({
            where: {
                slug,
            },
        });

        if (org) return org;
        return ORG_NOT_FOUND;
    }

    async update(updateOrgDto: UpdateOrgDto) {
        const { organizationId, name } = updateOrgDto;

        const org = await this.prismaService.organization.findUnique({
            where: {
                id: organizationId,
            },
        });

        if (!org) return ORG_NOT_FOUND;

        const updatedOrg = await this.prismaService.organization.update({
            where: {
                id: organizationId,
            },
            data: {
                name,
            },
        });

        return updatedOrg;
    }

    async findOrgsByUser(uid: string) {
        const orgs = await this.prismaService.organizationMember.findMany({
            where: {
                userUid: uid,
            },
            select: {
                organization: {
                    include: {
                        _count: {
                            select: {
                                members: true,
                                events: true,
                            },
                        },
                    },
                },
                role: true,
            },
        });

        const count = await this.prismaService.organizationMember.count();

        return {
            count,
            orgs,
        };
    }
    async deleteOrg(id: string) {
        await this.prismaService.organization.delete({
            where: {
                id,
            },
        });
        return {
            ok: true,
            message: 'org was deleted successfully',
        };
    }

    /*  
  
  *  if there is only one admin and he is the one leaving the org we should tranfer the org to the first 
     person who joined the org

  *  if the person is the last person to leave the org we should delete the org completly
 
  *  if there is multiple admins just make user leave the org
   
  */

    async leaveOrg(orgId: string, userId: string) {
        try {
            await this.prismaService.organizationMember.delete({
                where: {
                    userUid_organizationId: {
                        userUid: userId,
                        organizationId: orgId,
                    },
                },
            });
            return {
                ok: true,
                message: 'successfully left the organization',
            };
        } catch {
            return {
                ok: false,
                message: 'Unable to leave the org please try again later',
            };
        }
    }

    async getAllEvents(id: string) {
        try {
            const event = await this.prismaService.events.findMany({
                where: {
                    organizationId: id,
                },
            });

            return event;
        } catch (e) {
            return {
                ok: false,
                message: 'could not find the events',
                ERROR: e,
            };
        }
    }

    async getOrgRole(orgId: string, user: string) {
        try {
            return await this.prismaService.organizationMember.findUnique({
                where: {
                    userUid_organizationId: {
                        userUid: user,
                        organizationId: orgId,
                    },
                },
                select: {
                    role: true,
                },
            });
        } catch {}
    }

    // return the role of the user in current org
    getRoleOrg(role: Role) {
        return {
            ok: true,
            message: 'found role successfully',
            role,
        };
    }
}
