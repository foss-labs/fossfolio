import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizationMemberService } from 'src/org-member/org-member.service';
import { OrganizationInviteService } from 'src/org-invite/org-invite.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrganizationController],
    providers: [OrganizationService, OrganizationMemberService, OrganizationInviteService],
})
export class OrganizationModule {}
