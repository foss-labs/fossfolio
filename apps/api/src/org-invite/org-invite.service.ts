import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { sendInvite } from './sendEmail';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

    async inviteToOrg(email: string, inviterid: string, orgId: string, role: Role) {
        try {
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
                    const inviteURL = `${process.env.CLIENT_URL}/invite?id=${inviteId}`;
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
}
