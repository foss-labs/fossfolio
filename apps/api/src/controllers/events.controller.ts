import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EventsService } from "../services/events.service";
import { AuthUser } from "../services/auth/decorators/user.decorator";
import { RbacGuard } from "../services/guards/rbac-member.guard";
import { CreateEventDto, UpdateEventDto } from "../dto/events.dto";
import { Roles } from "../services/decorator/roles.decorator";

import { Role } from "@api/utils/db";
import { User } from "@api/db/schema";
import { ApiTags } from "@nestjs/swagger";

@Controller("/events")
@ApiTags("Events")
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Get("/")
  async getAllEvents(@Query("search") query: string) {
    return await this.events.getAllEvents(query);
  }

  @Post("/create")
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async createEvent(
    @Body() createEventData: CreateEventDto,
    @AuthUser() user: User,
    @Param("orgId") orgId: string
  ) {
    return await this.events.createEvent({
      newEvent: createEventData,
      user,
      orgId,
    });
  }

  @Get("/:slug")
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async getEventBySlug(@Param("slug") slug: string) {
    return await this.events.getEventBySlug(slug);
  }

  @Get("/org")
  async getEventById(@Query("id") id: string) {
    return await this.events.getEventById(id);
  }

  @Patch("/")
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async updateEvent(
    @Body() updateData: UpdateEventDto,
    @AuthUser() user: User,
    @Query("orgId") orgId: string,
    @Query("eventId") eventId: string
  ) {
    return await this.events.updateEvent({
      updateData,
      user,
      orgId,
      eventId,
    });
  }

  @Delete(":eventId")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async deleteEvent(
    @Param("orgId") orgId: string,
    @Query("eventId") eventId: string
  ) {
    return await this.events.deleteEvent({
      eventId,
      orgId,
    });
  }
}
