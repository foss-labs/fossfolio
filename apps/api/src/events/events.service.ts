import { Injectable } from '@nestjs/common';
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
            await this.prismaService.events.findMany();
        } catch {
            return null;
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
}
