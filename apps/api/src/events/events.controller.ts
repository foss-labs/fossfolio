import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly events: EventsService) {}

    @Get('/')
    async getAllEvents() {
        return await this.events.getAllEvents();
    }
    @Post('/create')
    async createNewEvent(@Body() data: CreateEventDto) {
        return this.events.createEvent(data);
    }
}
