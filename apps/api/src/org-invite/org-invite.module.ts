import { Module } from '@nestjs/common';
import { OrganizationInviteService } from './org-invite.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrgInviteController } from './org-invite.controller';

@Module({
    providers: [OrganizationInviteService],
    imports: [PrismaModule],
    controllers: [OrgInviteController],
})
export class OrganizationInviteModule {}
