import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateEventException } from './exception/create-event.exceptions';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('/createEvent')
    async createEvent(@Body() createEventDto: CreateEventDto) {
        try {
            return await this.eventService.createEvent(createEventDto);
        } catch (error) {
            throw new CreateEventException(error);
        }
    }

    @Get('/viewEvents')
    async getEventbySlug(@Query('search') search: string) {
        return this.eventService.getEventBySlug(search);
    }

    @Get('/viewAllEvents')
    async viewEvent() {
        try {
            return await this.eventService.viewAllEvents();
        } catch (error) {
            throw new CreateEventException(error);
        }
    }

    // Get my hackathons

    @Get('/viewMyEvents')
    async viewMyEvents() {
        try {
            return await this.eventService.viewMyEvents();
        } catch (error) {
            throw new CreateEventException(error);
        }
    }
}
