import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	Delete,
} from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../services/decorator/roles.decorator';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { UserRole } from '../services/auth/decorators/role.decorator';
import { Role } from '@api/utils/db';
import type { LeaveOrg } from '../services/dto/leave-org.dto';
import type { CreateOrgDto } from '../services/dto/create-org.dto';
import type { DeleteOrgDto } from '../services/dto/delete-org.dto';
import type { UpdateOrgDto } from '../services/dto/update-org.dto';
import type { User } from '@api/db/schema';

@Controller('org')
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	@Post('/')
	@UseGuards(AuthGuard('jwt'))
	async createOrganization(
		@Body() createOrgDto: CreateOrgDto,
		@AuthUser() user: User,
	) {
		return this.organizationService.create(createOrgDto, user.id);
	}

	@Get('/find/:slug')
	async findOrgBySlug(@Param('slug') slug: string) {
		return this.organizationService.findOrgBySlug(slug);
	}

	@Get('/:orgId')
	@UseGuards(AuthGuard('jwt'))
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getOrgInfo(@Param('orgId') info) {
		return await this.organizationService.getOrgById(info);
	}

	@Get('/events/public/:slug')
	async getOrgEvents(@Param('slug') slug) {
		return await this.organizationService.getEventsByorg(slug);
	}

	@Get('/events/:orgId')
	@Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getAllEvents(@Param('orgId') orgID: string, @UserRole() role: Role) {
		return this.organizationService.getAllEvents(orgID, role);
	}

	@Patch('/')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async updateOrganization(@Body() updateOrgDto: UpdateOrgDto) {
		return this.organizationService.update(updateOrgDto);
	}

	@Delete('/delete')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async deleteOrganization(@Body() data: DeleteOrgDto) {
		return this.organizationService.deleteOrg(data.organizationId);
	}

	@Delete('/leave')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async leaveOrg(@AuthUser() user: User, @Body() body: LeaveOrg) {
		return this.organizationService.leaveOrg(body.organizationId, user.id);
	}

	@Patch('/update')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async UpdateOrg(@Body() data: UpdateOrgDto) {
		return await this.organizationService.UpdateOrg(data.organizationId, data);
	}
}
