import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    NotFoundException,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { EventsService } from './events.service';
import { AuthUser } from '../auth/decorators/user.decorator';
import { RbacGuard } from '../organization/guards/rbac-member.guard';
import { CreateEventDto } from './dto/create-events.dto';
import { Roles } from '../organization/decorators/roles.decorator';
import { UpdateEventDto } from './dto/updtate-event.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { FormPayLoad } from './dto/create-form.dto';
import { ToggleFormPublishStatus } from './dto/publishForm.dto';
import { url } from 'inspector';
@Controller('events')
export class EventsController {
    constructor(private readonly events: EventsService) {}

    @Get('/')
    @ApiOperation({ summary: 'returns all upcoming events' })
    async getAllEvents() {
        return await this.events.getAllEvents();
    }

    @Get('/:eventId')
    @ApiOperation({ summary: 'returns the specific event with id' })
    async getEventByID(@Param('eventId') id: string) {
        return await this.events.getEventById(id);
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
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async updateNewEvent(@Body() data: UpdateEventDto) {
        return await this.events.updateEvent(data);
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register for specific event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async registerEvent(@Body() data: RegisterEventDto, @AuthUser() user: User) {
        return await this.events.registerEvent(data.eventId, user.uid);
    }

    @Get('/participants/:orgID/:id')
    @Roles('ADMIN', 'EDITOR', 'VIEWER')
    @ApiOperation({ summary: 'Get all participants of events' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getregisterDParticipants(@Param('id') id: string) {
        return await this.events.getEventParticipants(id);
    }

    @Get('/participants/:orgID/:id/form')
    @Roles('ADMIN', 'EDITOR', 'VIEWER')
    @ApiOperation({ summary: 'Get all the form submissipn from participant' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getregisterParticipantsFormSubmissions(@Param('id') id: string, @AuthUser() user: User) {
        return await this.events.getregisterParticipantsFormSubmissions(id, user.uid);
    }

    @Get('/status/:id')
    @ApiOperation({ summary: 'Get if participant is registerd for event or not' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getUserEventStatus(@Param('id') id: string, @AuthUser() user: User) {
        return await this.events.getEventRegistartionStatus(id, user.uid);
    }

    @Post('/form')
    @Roles('ADMIN', 'EDITOR')
    @ApiOperation({ summary: 'Create form for each event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async createForm(@Body() payload: FormPayLoad) {
        return await this.events.createForm(payload);
    }

    @Patch('/edit/cover')
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload image for event cover page' })
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                // file size validators
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // support png,jpg,peg
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), // File size 4 megabytes
                ],
            }),
        )
        file: Express.Multer.File,
        @Query('event') event: string,
    ) {
        return await this.events.uploadEventCover(file, event);
    }

    @Get('/form/:orgID/:eventId')
    @Roles('ADMIN', 'EDITOR')
    @ApiOperation({ summary: 'get form schema of a specific event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getFormSchema(@Param('eventId') eventId: string) {
        return await this.events.getEventFormScheme(eventId);
    }

    @Post('/form/:eventId')
    @ApiOperation({ summary: 'users register form via this route' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async postFormResponse(
        @Param('eventId') eventId: string,
        @Body() data: Record<string, string | Array<string>>,
        @AuthUser() user: User,
    ) {
        try {
            const event = await this.events.getEventInfo(eventId);
            if (event.maxTicketCount < 1) {
                throw new NotFoundException();
            }
            await this.events.addUserFormSubmission(data, eventId, user.uid);
            await this.events.registerEvent(eventId, user.uid);
        } catch (e) {
            if (e instanceof NotFoundException) return new NotFoundException();
            return {
                ok: false,
                message: 'Invalid request',
                error: e,
            };
        }
    }

    @Post('/publish/form/:id')
    @ApiOperation({ summary: 'publish event , by doing this we lets public to register for event' })
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async publishForm(@Param('id') data: string, @Body() payload: ToggleFormPublishStatus) {
        return await this.events.toggleFormPublishStatus(data, payload.shouldFormPublish);
    }

    @Get('/ticket/:eventId')
    @Roles('ADMIN', 'EDITOR')
    @ApiOperation({ summary: 'publish or not publish the already build form public' })
    async getTicketInfo(@Param('eventId') eventId: string) {
        return await this.events.getTicketInfo(eventId);
    }
}
