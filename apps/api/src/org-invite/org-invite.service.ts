import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { sendInvite } from './sendEmail';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

    async inviteToOrg(email: string, inviterid: string, orgId: string, role: Role) {
        try {
            const data = await this.prismaService.organization.update({
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
            const inviter = await this.prismaService.user.findUnique({
                where: {
                    uid: inviterid,
                },
            });
            //  finding the id of new invite
            const inviteId = data.invites.find((el) => el.inviteeEmail === email).id;
            const inviteInfo = {
                inviteId: inviteId,
                from: inviter.displayName,
                orgName: data.name,
                fromEmail: inviter.email,
            };
            console.log(email, inviteInfo);
            const res = await sendInvite(email, inviteInfo);

            if (res) {
                return {
                    ok: true,
                    message: 'email send successfully , please check your mailbox',
                };
            } else {
                /*
                 TODO
                * revert back the invite from db
                * we shoud always follow ACID method
                */
                throw new Error();
            }
        } catch {
            return {
                ok: false,
                message: 'email sending failed, please try again later',
            };
        }
    }
}
