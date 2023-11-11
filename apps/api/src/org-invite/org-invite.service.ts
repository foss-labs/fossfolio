import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { sendInvite } from './sendEmail';
import { Role } from '@prisma/client';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

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
                    message: 'user is already invited, please check your mailbox',
                };
            }

            // transaction
            const transactionStatus = await this.prismaService.$transaction(async (db) => {
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
                const inviteInfo = {
                    inviteId: inviteId,
                    from: inviter.displayName,
                    orgName: data.name,
                    fromEmail: inviter.email,
                };

                if (process.env.NODE_ENV === 'production') {
                    const res = await sendInvite(email, inviteInfo);
                    return res;
                } else {
                    const localPort = process.env.CLIENT_URL || 'http://localhost:3000';
                    const inviteURL = `${localPort}/verify?id=${inviteId}`;
                    return {
                        ok: true,
                        message: 'invite send successfully',
                        data: inviteURL,
                    };
                }
            });

            const isProd = process.env.NODE_ENV === 'production';

            if (!isProd) {
                return transactionStatus;
            }

            if (transactionStatus) {
                return {
                    ok: true,
                    message: 'email send successfully , please check your mailbox',
                };
            }

            throw new Error();
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
