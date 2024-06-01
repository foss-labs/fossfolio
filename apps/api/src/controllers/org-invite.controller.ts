import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { Roles } from '../services/decorator/roles.decorator';
import { OrganizationInviteService } from '../services/org-invite.service';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import type { OrgInvie } from '../services/dto/user-invite.dto';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';

@Controller('org/invite')
export class OrgInviteController {
	constructor(private readonly service: OrganizationInviteService) {}

	@Post('/')
	@Roles('ADMIN')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async sendInvite(@AuthUser() user: User, @Body() data: OrgInvie) {
		return this.service.inviteToOrg(
			data.email,
			user.uid,
			data.organizationId,
			data.role,
		);
	}

	@Get('/verify')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async verfyEmail(@AuthUser() user: User, @Query() { id }) {
		return this.service.verifyEmailInvite(id, user.uid, user.email);
	}
}
