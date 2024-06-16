import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { Roles } from '../services/decorator/roles.decorator';
import { Role } from '@api/utils/db';
import { ZodValidator } from '@api/validation/zod.validation.decorator';
import { EventParamsSchema } from '@api/dto/events.dto';
import { OrgEventsService } from '@api/services/org-events.service';
import { User } from '@api/db/schema';
import type { RemoveUserDto } from '../services/dto/remove-user.dto';

@Controller()
export class OrgEventsController {
	constructor(private readonly orgEventsService: OrgEventsService) {}

	@Get('/:orgId/events/:eventId/participants')
	@Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getRegisteredParticipants(
		@Param('orgId') orgId: string,
		@Param('id') eventId: string,
	) {
		return await this.orgEventsService.getEventParticipants({
			orgId,
			eventId,
		});
	}

	@Delete('/participants/delete')
	@Roles(Role.ADMIN, Role.EDITOR)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async removePartcipent(@Body() data: RemoveUserDto) {
		return await this.events.removeParticipant(data.eventId, data.userId);
	}

	@Get('/status/:id')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getUserEventStatus(
		@Param('id') slugId: string,
		@AuthUser() user: User,
	) {
		return await this.events.getEventRegistartionStatus(slugId, user.id);
	}

	@Get('/stats/:id')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async getEventStats(@Param('id') id: string) {
		return await this.events.getEventStats(id);
	}
}
