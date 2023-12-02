import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService,private readonly eventEmitter: EventEmitter2) {}

    async inviteToOrg(email: string, inviterid: string, orgId: string, role: Role) {
        try {
            // if there is already invite send no need of transaction
            const isAlreadySent = await this.prismaService.organizationInvite.findUnique({
                where: {
                    inviteeEmail_organizationId: {
                        inviteeEmail: email,
                        organizationId: orgId,
                    },
                },
                select: {
                    id: true,
                },
            });
            // if user already exist in db
            if (isAlreadySent) {
                const isProd = process.env.NODE_ENV === 'production';

                const localPort = process.env.CLIENT_URL || 'http://localhost:3000';
                const inviteURL = `${localPort}/verify?id=${isAlreadySent.id}`;
                if (!isProd) {
                    return {
                        ok: true,
                        message: 'user is already invited, please check your mailbox',
                        data: inviteURL,
                    };
                }

                return {
                    ok: true,
                    message: 'user is already invited, please check your mailbox for old mails',
                };
            }

            // transaction
            const inviteUrl = await this.prismaService.$transaction(async (db) => {
                const data = await db.organization.update({
                    where: {
                        id: orgId,
                    },
                    data: {
                        invites: {
                            create: {
                                inviteeEmail: email,
                                inviterUid: inviterid,
                                inviteeRole: role,
                            },
                        },
                    },
                    include: {
                        invites: true,
                    },
                });
                // the guy who send invite
                const inviter = await db.user.findUnique({
                    where: {
                        uid: inviterid,
                    },
                });
                const inviteId = data.invites.find((el) => el.inviteeEmail === email).id;
                //  finding the id of new invite
                const localPort = process.env.CLIENT_URL || 'http://localhost:3000';
                const inviteURL = `${localPort}/verify?id=${inviteId}`;


                await this.eventEmitter.emit('org.invite', {
                    to: email,
                    inviteUrl: inviteURL,
                    from: inviter.displayName,
                    orgName: data.name,
                    fromEmail: inviter.email,
                })

                return inviteURL
            });

                return {
                    ok: true,
                    data: process.env.NODE_ENV !== 'production'? inviteUrl : null,
                    message: 'email sent successfully , please check your mailbox',
                };

        } catch {
            return {
                ok: false,
                message: 'email sending failed, please try again later',
            };
        }
    }

    async verifyEmailInvite(id: string, ownerId: string) {
        // TODO
        // convert to transaction
        try {
            const data = await this.prismaService.organizationInvite.findUniqueOrThrow({
                where: {
                    id: id,
                },
            });
            const orgData = await this.prismaService.organization.update({
                where: {
                    id: data.organizationId,
                },
                data: {
                    members: {
                        create: {
                            role: data.inviteeRole,
                            userUid: ownerId,
                        },
                    },
                },
            });
            await this.prismaService.organizationInvite.delete({
                where: {
                    id: id,
                },
            });
            if (orgData) {
                return {
                    ok: true,
                    message: 'invite verifcation successfull',
                    data: orgData,
                };
            }
            throw new Error();
        } catch {
            return {
                ok: false,
                message: 'couldnt verify the invite',
            };
        }
    }
}
