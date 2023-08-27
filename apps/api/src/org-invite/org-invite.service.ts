import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { sendInvite } from './sendEmail';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationInviteService {
    constructor(private readonly prismaService: PrismaService) {}

    async inviteToOrg(email: string, inviterid: string, orgId: string, role: Role) {
        const data = await this.prismaService.organizationInvite.create({
            data: {
                inviteeEmail: email,
                inviterUid: inviterid,
                organizationId: orgId,
                inviteeRole: role,
            },
            include: {
                organization: true,
            },
        });
        const invitee = await this.prismaService.user.findUnique({
            where: {
                uid: inviterid,
            },
        });

        const inviteInfo = {
            inviteId: data.id,
            from: invitee.displayName,
            orgName: data.organization.name,
            fromEmail: invitee.email,
        };
        await sendInvite(email, inviteInfo);
    }
}
