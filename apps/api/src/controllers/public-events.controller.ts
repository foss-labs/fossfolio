import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { EventsService } from '../services/events.service';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import type { RegisterEventDto } from '../services/dto/register-event.dto';

@Controller()
export class PublicEventsController {
	constructor(private readonly events: EventsService) {}

	@Post('/register')
	@ApiTags('events')
	@ApiOperation({ summary: 'Register for specific event' })
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	async registerEvent(@Body() data: RegisterEventDto, @AuthUser() user: User) {
		return await this.events.registerEvent(data.eventId, user.uid);
	}

	@Get('/ticket/:eventId')
	@ApiTags('events')
	@ApiOperation({ summary: 'return  ticket info' })
	async getTicketInfo(@Param('eventId') eventId: string) {
		return await this.events.getTicketInfo(eventId);
	}
}
