import { Module } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [OrganizationMemberService],
    imports: [PrismaModule],
})
export class OrganizationMemberModule {}
