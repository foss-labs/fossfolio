import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { Roles } from '../services/decorator/roles.decorator';
import { OrganizationInviteService } from '../services/org-invite.service';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@api/utils/db';
import { User } from '@api/db/schema/user';
import type { OrgInvite } from '../services/dto/user-invite.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('org/:orgId/invite')
@ApiTags('Org - Invite')
export class OrgInviteController {
	constructor(private readonly service: OrganizationInviteService) {}

	@Post('/')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async sendInvite(
		@AuthUser() user: User,
		@Body() data: OrgInvite,
		@Param('orgId') orgId: string,
	) {
		return this.service.inviteToOrg({
			email: data.email,
			userId: user.id,
			role: data.role,
			orgId: orgId,
		});
	}

	@Get('/verify')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async verfyEmail(@AuthUser() user: User, @Query() { id }) {
		return this.service.verifyEmailInvite(id, user.id, user.email);
	}
}
