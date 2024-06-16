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
	PublicEventParamsSchema,
	UpdateEventSchema,
	UpdateEventDto,
	EventParamsSchema,
} from '../dto/events.dto';
import { Roles } from '../services/decorator/roles.decorator';
import { ZodValidator } from '@api/validation/zod.validation.decorator';
import { CreateEventSchema } from '@api/dto/events.dto';
import { Role } from '@api/utils/db';
import { User } from '@api/db/schema';
import { z } from 'zod';
import { ApiTags } from '@nestjs/swagger';

@Controller('/events')
@ApiTags('Events')
export class EventsController {
	constructor(private readonly events: EventsService) {}

	@Get('/')
	async getAllEvents(@Query('search') query: string) {
		return await this.events.getAllEvents(query);
	}

	@Post('/:orgId/create')
	@Roles(Role.ADMIN, Role.EDITOR)
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({
		body: CreateEventSchema,
		params: z.string(),
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

	@Get('/:slug')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@ZodValidator({ params: PublicEventParamsSchema })
	async getEventBySlug(@Param('slug') slug: string) {
		return await this.events.getEventBySlug(slug);
	}

	@Get('/org/:eventId')
	async getEventById(@Param('eventId') id: string) {
		return await this.events.getEventById(id);
	}

	@Patch('/:orgId/:eventId')
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

	@Delete('/:orgId/:eventId')
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
