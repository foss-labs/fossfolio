import { Module } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrgMemberController } from './org-member.controller';

@Module({
    providers: [OrganizationMemberService],
    imports: [PrismaModule],
    controllers: [OrgMemberController],
})
export class OrganizationMemberModule {}
