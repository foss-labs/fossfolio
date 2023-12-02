import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationMemberService } from '../org-member/org-member.service';
import { OrganizationInviteService } from '../org-invite/org-invite.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrganizationController],
    providers: [OrganizationService, OrganizationMemberService, OrganizationInviteService],
})
export class OrganizationModule {}
