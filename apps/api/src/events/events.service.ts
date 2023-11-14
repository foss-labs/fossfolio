import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/updtate-event.dto';
import { GetEventByOrgDto, GetEventByOrgIdDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prismaService: PrismaService) {}

    async createEvent(d: CreateEventDto) {
        const date = new Date(d.lastDate);

        try {
            const data = await this.prismaService.organization.update({
                where: {
                    id: d.organizationId,
                },
                data: {
                    events: {
                        create: {
                            name: d.name,
                            website: d.website,
                            location: d.location,
                            lastDate: date,
                        },
                    },
                },
            });
            return {
                ok: true,
                message: 'event created successfully',
                data,
            };
        } catch (e) {
            return {
                ok: false,
                message: 'could not create event',
                ERROR: e,
            };
        }
    }

    // TODO
    // Auth guard
    // rbac access to admin and editor
    async updateEvent(payload: UpdateEventDto) {
        try {
            return await this.prismaService.events.update({
                where: {
                    id: payload.id,
                },
                data: {
                    name: payload.name,
                    website: payload.website,
                    description: payload.description,
                    lastDate: payload.lastDate,
                    location: payload.location,
                },
            });
        } catch {
            return null;
        }
    }

    async getAllEvents() {
        try {
            // only need events that are not expired last date
            return await this.prismaService.events.findMany({
                where: {
                    lastDate: {
                        lte: new Date(),
                    },
                    isPublished: true,
                },
            });
        } catch {
            return {
                ok: false,
                message: 'could not get events',
            };
        }
    }

    async getEventByOrgSlug(payload: GetEventByOrgDto) {
        try {
            return await this.prismaService.organization.findMany({
                where: {
                    slug: payload.slug,
                },
                select: {
                    events: true,
                },
            });
        } catch {
            return null;
        }
    }

    async getEventByOrgsId(payload: GetEventByOrgIdDto) {
        try {
            return await this.prismaService.organization.findMany({
                where: {
                    id: payload.id,
                },
                select: {
                    events: true,
                    members: true,
                },
            });
        } catch {
            return null;
        }
    }

    async publishEvent(eventId: string) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    id: eventId,
                },
            });

            if (!data) {
                throw new NotFoundException();
            }

            const { description, maxTicketCount, eventDate } = data;
            if (!description || !maxTicketCount || !eventDate) {
                throw new UnprocessableEntityException({
                    message: 'please provide all required information for event',
                });
            }
            await this.prismaService.events.update({
                where: {
                    id: eventId,
                },
                data: {
                    isPublished: true,
                },
            });

            return {
                ok: true,
                message: 'event was published successfully',
            };
        } catch (e) {
            // Use exception filters to handle exceptions and return appropriate responses
            if (e instanceof NotFoundException) {
                throw new NotFoundException({
                    ok: false,
                    message: e.message,
                });
            } else if (e instanceof UnprocessableEntityException) {
                throw new UnprocessableEntityException({
                    ok: false,
                    message: e.message,
                });
            } else {
                throw e; // Rethrow other exceptions
            }
        }
    }
}
