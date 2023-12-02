import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '../organization/guards/rbac-member.guard';

@Controller('org/member')
export class OrgMemberController {
    constructor(private readonly orgMemberService: OrganizationMemberService) {}

    @Get('/:orgID')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getMembers(@Param('orgID') orgID: string) {
        return this.orgMemberService.getMembers(orgID);
    }
}
