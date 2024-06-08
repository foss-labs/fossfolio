import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/organization/decorators/roles.decorator';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { FormService } from './form.service';
import { EventsService } from '../events/events.service';
import { FormPayLoad } from './dto/create-form.dto';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { ToggleFormPublishStatus } from './dto/publish-form.dto';

@Controller('/events')
export class FormController {
    constructor(
        private form: FormService,
        private events: EventsService,
    ) {}

    @Get('/form/:orgID/:eventId')
    @ApiTags('events')
    @Roles('ADMIN', 'EDITOR', 'VIEWER')
    @ApiOperation({ summary: 'get form schema of a specific event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getFormSchema(@Param('eventId') slugId: string) {
        return await this.form.getEventFormScheme(slugId);
    }

    @Post('/form/:eventId')
    @ApiTags('events')
    @ApiOperation({ summary: 'users register form via this route' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async postFormResponse(
        @Param('eventId') eventId: string,
        @Body() data: Record<string, string | Array<string>>,
        @AuthUser() user: User,
    ) {
        try {
            const event = await this.events.getEventById(eventId);
            if (event.maxTicketCount < 1) {
                throw new NotFoundException();
            }
            await this.form.addUserFormSubmission(data, eventId, user.uid);
            return await this.events.registerEvent(event.slug, user.uid);
        } catch (e) {
            if (e instanceof NotFoundException) throw new NotFoundException();

            throw new InternalServerErrorException();
        }
    }

    @Post('/publish/form/:id')
    @ApiTags('events')
    @ApiOperation({ summary: 'publish event , by doing this we lets public to register for event' })
    @Roles('ADMIN', 'EDITOR')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async publishForm(@Param('id') data: string, @Body() payload: ToggleFormPublishStatus) {
        return await this.form.toggleFormPublishStatus(data, payload.shouldFormPublish);
    }

    @Post('/form')
    @ApiTags('events')
    @Roles('ADMIN', 'EDITOR')
    @ApiOperation({ summary: 'Create form for each event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async createForm(@Body() payload: FormPayLoad) {
        return await this.form.createForm(payload);
    }

    @Get('/participants/:orgID/:id/:userId/form')
    @ApiTags('events')
    @Roles('ADMIN', 'EDITOR', 'VIEWER')
    @ApiOperation({ summary: 'Get all the form submission from participant' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async getRegisteredParticipantsFormSubmissions(
        @Param('id') id: string,
        @Param('userId') uid: string,
    ) {
        return await this.form.getRegisteredParticipantsFormSubmissions(id, uid);
    }

    @Delete('/form/bulk-delete/:slug')
    @ApiTags('events')
    @Roles('ADMIN', 'EDITOR')
    @ApiOperation({ summary: 'Bulk delete form for each event' })
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    async bulkDeleteForm(@Param('slug') eventName: string) {
        return await this.events.deleteForm(eventName);
    }
}
