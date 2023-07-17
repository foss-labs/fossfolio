import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { OrganizationMemberService } from './org-member.service';
import { Roles } from 'src/organization/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { GenericOrgDto } from 'src/organization/dto/generic-org.dto';

@Controller('org/member')
export class OrgMemberController {
    constructor(private readonly orgMemberService: OrganizationMemberService) {}

    @Get('')
    @Roles('')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getMembers(@Body() genericOrgDto: GenericOrgDto) {
        return this.orgMemberService.getMembers(genericOrgDto.organizationId);
    }
}
