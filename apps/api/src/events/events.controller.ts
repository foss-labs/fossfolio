import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { Roles } from 'src/organization/decorators/roles.decorator';

@Controller('events')
export class EventsController {
    constructor(private readonly events: EventsService) {}

    @Get('/')
    async getAllEvents() {
        return await this.events.getAllEvents();
    }
    @Post('/create')
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async createNewEvent(@Body() data: CreateEventDto) {
        return this.events.createEvent(data);
    }

    @Get('/publish/:orgID/:id')
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async publishNewEvent(@Param() data) {
        return this.events.publishEvent(data.id);
    }
}
