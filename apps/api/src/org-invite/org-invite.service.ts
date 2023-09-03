import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { sendInvite } from './sendEmail';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

    async inviteToOrg(email: string, inviterid: string, orgId: string, role: Role) {
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
        await sendInvite(email, inviteInfo);
    }
}
