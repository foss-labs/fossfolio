import { Module } from '@nestjs/common';
import { OrganizationInviteService } from './org-invite.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [OrganizationInviteService],
    imports: [PrismaModule],
})
export class OrganizationInviteModule {}
