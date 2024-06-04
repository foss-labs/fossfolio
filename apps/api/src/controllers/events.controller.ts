import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from '../services/events.service';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import {
	CreateEventDto,
	CreateEventParamsSchema,
	EventParamsSchema,
	UpdateEventSchema,
	UpdateEventDto,
} from '../dto/events.dto';
import { Roles } from '../services/decorator/roles.decorator';
import { ZodValidator } from '@api/validation/zod.validation.decorator';
import { CreateEventSchema } from '@api/dto/events.dto';
import { Role } from '@api/utils/db';
import { User } from '@api/db/schema';

@Controller()
export class EventsController {
	constructor(private readonly events: EventsService) {}

	@Get('/events')
	async getAllEvents(@Query('search') query: string) {
		return await this.events.getAllEvents(query);
	}

	@Post('/:orgId/events')
	@Roles(Role.ADMIN, Role.EDITOR)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({
		body: CreateEventSchema,
		params: CreateEventParamsSchema,
	})
	async createEvent(
		@Body() createEventData: CreateEventDto,
		@AuthUser() user: User,
		@Param('orgId') orgId: string,
	) {
		return await this.events.createEvent({
			newEvent: createEventData,
			user,
			orgId,
		});
	}

	@Get('/:orgId/events/:eventId')
	@Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({ params: EventParamsSchema })
	async getEventByID(@Param('eventId') id: string) {
		return await this.events.getEventById(id);
	}

	@Patch('/:orgId/events/:eventId')
	@Roles(Role.ADMIN, Role.EDITOR)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({
		body: UpdateEventSchema,
		params: EventParamsSchema,
	})
	async updateEvent(
		@Body() updateData: UpdateEventDto,
		@AuthUser() user: User,
		@Param('orgId') orgId: string,
		@Param('eventId') eventId: string,
	) {
		return await this.events.updateEvent({
			updateData,
			user,
			orgId,
			eventId,
		});
	}

	@Delete('/:orgId/events/:eventId')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({
		params: EventParamsSchema,
	})
	async deleteEvent(
		@Param('orgId') orgId: string,
		@Param('eventId') eventId: string,
	) {
		return await this.events.deleteEvent({
			eventId,
			orgId,
		});
	}
}
