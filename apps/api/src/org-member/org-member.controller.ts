import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '../organization/guards/rbac-member.guard';
import { Roles } from 'src/organization/decorators/roles.decorator';
import { RemoveMember } from './dto/member-remove.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('org/member')
export class OrgMemberController {
    constructor(private readonly orgMemberService: OrganizationMemberService) {}

    @Get('/:orgID')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getMembers(@Param('orgID') orgID: string) {
        return await this.orgMemberService.getMembers(orgID);
    }

    @Patch('/remove')
    @ApiTags('org-members')
    @ApiOperation({ summary: 'Remove members from organization' })
    @ApiResponse({ status: 200, description: 'User will be removed successfully' })
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async removeUser(@Body() data: RemoveMember) {
        return await this.orgMemberService.removeMember(data.organisationId, data.memberId);
    }
}
