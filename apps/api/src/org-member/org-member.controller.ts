import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { Roles } from 'src/organization/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { GenericOrgDto } from 'src/organization/dto/generic-org.dto';

@Controller('org/member')
export class OrgMemberController {
    constructor(private readonly orgMemberService: OrganizationMemberService) {}

    @Get('/:orgID')
    @Roles('')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getMembers(@Param('orgID') orgID: string) {
        return this.orgMemberService.getMembers(orgID);
    }
}
