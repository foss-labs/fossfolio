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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../services/decorator/roles.decorator";
import { RbacGuard } from "../services/guards/rbac-member.guard";
import { FormService } from "../services/form.service";
import { EventsService } from "../services/events.service";
import {
  CreateFormFieldDto,
  CreateFormFieldSchema,
} from "@api/dto/form-field.dto";
import { AuthUser } from "../services/auth/decorators/user.decorator";
import { ZodValidator } from "@api/validation/zod.validation.decorator";
import { Role } from "@api/utils/db";
import { EventTicketModel } from "@api/models";
import { User } from "@api/db/schema";
import type { ToggleFormPublishStatus } from "../services/dto/publish-form.dto";

@Controller("/events")
@ApiTags("Events-Form")
export class FormController {
  constructor(private form: FormService, private events: EventsService) {}

  @Get("/form/:orgId/:eventId")
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  @ApiOperation({ summary: "get all form of a specific event" })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async getAllForms(
    @Param("eventId") eventId: string,
    @Param("formId") formId: string
  ) {
    return await this.form.getAllForm(eventId);
  }

  @Get("/form/:orgId/:eventId/:formId")
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  @ApiOperation({ summary: "get form schema of a specific event" })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async getFormSchema(
    @Param("eventId") eventId: string,
    @Param("formId") formId: string
  ) {
    return await this.form.getEventFormScheme(eventId, formId);
  }

  @Post("/form/:eventId")
  @ApiOperation({ summary: "users register form via this route" })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async postFormResponse(
    @Param("eventId") eventId: string,
    @Body() data: Record<string, string | Array<string>>,
    @AuthUser() user: User
  ) {
    try {
      const event = await EventTicketModel.findOne({
        fk_event_id: eventId,
      });
      if (!event || event?.price > 0) {
        // temporary we dont support paid event
        // @reenphygeorge
        throw new NotFoundException();
      }
      await this.form.addUserFormSubmission(data, eventId, user.id);
      return await this.events.registerEvent(event.slug, user.id);
    } catch (e) {
      if (e instanceof NotFoundException) throw new NotFoundException();

      throw new InternalServerErrorException();
    }
  }

  @Post("/publish/form/:id")
  @ApiOperation({
    summary:
      "publish event , by doing this we lets public to register for event",
  })
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async publishForm(
    @Param("id") data: string,
    @Body() payload: ToggleFormPublishStatus
  ) {
    return await this.form.toggleFormPublishStatus(
      data,
      payload.shouldFormPublish
    );
  }

  @Post("/form/:formId")
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: "Create form for each event" })
  @ZodValidator({
    body: CreateFormFieldSchema,
  })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async createForm(
    @Body() payload: CreateFormFieldDto,
    @Param("id") formId: string
  ) {
    return await this.form.createForm(payload, formId);
  }

  @Get("/participants/:orgId/:id/:userId/form")
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  @ApiOperation({ summary: "Get all the form submission from participant" })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async getRegisteredParticipantsFormSubmissions(
    @Param("id") id: string,
    @Param("userId") uid: string
  ) {
    return await this.form.getRegisteredParticipantsFormSubmissions(id, uid);
  }

  @Delete("/form/bulk-delete/:slug")
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: "Bulk delete form for each event" })
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async bulkDeleteForm(@Param("slug") eventName: string) {
    return await this.events.deleteForm(eventName);
  }
}
