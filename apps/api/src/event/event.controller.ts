import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
// import { CreateEventException } from './exception/create-event.exceptions';

@Controller('user')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('/createEvent')
    async createEvent(@Body() createEventDto: CreateEventDto) {
        try {
            // return await this.eventService.createEvent(createEventDto);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            // throw new CreateEventException(error);
        }
    }

    @Get('/viewEvents')
    async getEventbySlug(@Query('search') search: string) {
        // return this.eventService.getEventBySlug(search);
    }

    @Get('/viewAllEvents')
    async viewEvent() {
        try {
            // return await this.eventService.viewAllEvents();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            // throw new CreateEventException(error);
        }
    }

    // Get my hackathons

    @Get('/viewMyEvents')
    async viewMyEvents() {
        try {
            // return await this.eventService.viewMyEvents();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            // throw new CreateEventException(error);
        }
    }
}
