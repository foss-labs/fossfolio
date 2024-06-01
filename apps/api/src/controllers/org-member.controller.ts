import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { OrganizationMemberService } from '../services/org-member.service';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { Roles } from '../services/decorator/roles.decorator';
import type { RemoveMember } from '../services/dto/member-remove.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { UpdateMemberRole } from '../services/dto/update-role.dto';
import type { Role } from '@prisma/client';

@Controller('org/member')
export class OrgMemberController {
	constructor(private readonly orgMemberService: OrganizationMemberService) {}

	@Get('/:orgID')
	@Roles('ADMIN', 'EDITOR', 'VIEWER')
	@ApiTags('org-members')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getMembers(@Param('orgID') orgID: string) {
		return await this.orgMemberService.getMembers(orgID);
	}

	@Patch('/remove')
	@ApiTags('org-members')
	@ApiOperation({ summary: 'Remove members from organization' })
	@ApiResponse({
		status: 200,
		description: 'User will be removed successfully',
	})
	@Roles('ADMIN')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async removeUser(@Body() data: RemoveMember) {
		return await this.orgMemberService.removeMember(
			data.organizationId,
			data.memberId,
		);
	}

	@Patch('/role')
	@ApiTags('org-members')
	@ApiOperation({ summary: 'Update member role in org' })
	@ApiResponse({ status: 200, description: 'User role will be updated' })
	@Roles('ADMIN')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async updateUserRole(@Body() data: UpdateMemberRole) {
		return await this.orgMemberService.updateRole(
			data.organizationId,
			data.memberId,
			data.role as Role,
		);
		// swagger was throwing circular error so i had to define type as this way
	}
}
