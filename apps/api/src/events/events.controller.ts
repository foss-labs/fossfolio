import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { Roles } from 'src/organization/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateEventDto } from './dto/updtate-event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly events: EventsService) {}

    @Get('/')
    @ApiOperation({ summary: 'returns all upcoming events' })
    async getAllEvents() {
        return await this.events.getAllEvents();
    }
    @Post('/create')
    @ApiOperation({ summary: 'create new events' })
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async createNewEvent(@Body() data: CreateEventDto) {
        return await this.events.createEvent(data);
    }

    @Get('/publish/:orgID/:id')
    @ApiOperation({ summary: 'publish event , by doing this we lets public to register for event' })
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async publishNewEvent(@Param('id') data: string) {
        return await this.events.publishEvent(data);
    }
    @Patch('/edit')
    @ApiOperation({ summary: 'update info of event' })
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async updateNewEvent(@Body() data: UpdateEventDto) {
        return await this.events.updateEvent(data);
    }
}
