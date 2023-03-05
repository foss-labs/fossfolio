import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateEventException } from './exception/create-event.exceptions';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/createEvent')
    async createUser(@Body() createEventDto: CreateEventDto) {
        try {
            return await this.userService.createEvent(createEventDto);
        } catch (error) {
            throw new CreateEventException(error);
        }
    }

    @Get('/viewEvents')
    async getEventbySlug(@Query('search') search: string) {
        return this.userService.getEventBySlug(search);
    }

    @Get('/viewAllEvents')
    async viewUser() {
        try {
            return await this.userService.viewAllEvents();
        } catch (error) {
            throw new CreateEventException(error);
        }
    }

    // Get my hackathons

    @Get('/viewMyEvents')
    async viewMyEvents() {
        try {
            return await this.userService.viewMyEvents();
        } catch (error) {
            throw new CreateEventException(error);
        }
    }
}
