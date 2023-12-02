import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

    async updateEvent(payload: UpdateEventDto) {
        try {
            const event = await this.prismaService.events.findUnique({
                where: {
                    organizationId: payload.organizationId,
                    id: payload.eventId,
                },
            });

            if (!event) {
                throw new NotFoundException();
            }

            const data = await this.prismaService.events.update({
                where: {
                    organizationId: payload.organizationId,
                    id: payload.eventId,
                },
                data: {
                    name: payload.name || event.name,
                    website: payload.website || event.website,
                    location: payload.location || event.location,
                    description: payload.description || event.description,
                    lastDate: payload.lastDate || event.lastDate,
                    isPublished: payload.hasOwnProperty('isPublished')
                        ? payload.isPublished
                        : event.isPublished,
                    maxTeamSize: payload.maxTeamSize || event.maxTeamSize,
                    minTeamSize: payload.minTeamSize || event.minTeamSize,
                    isCollegeEvent: payload.hasOwnProperty('isCollegeEvent')
                        ? payload.isCollegeEvent
                        : event.isCollegeEvent,
                    maxTicketCount: payload.maxTicketCount || event.maxTicketCount,
                },
            });

            if (!data) {
                throw new UnprocessableEntityException();
            }

            return {
                ok: true,
                message: 'Event was updated successfully',
                data,
            };
        } catch (e) {
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

    async getAllEvents() {
        try {
            return await this.prismaService.events.findMany({
                where: {
                    lastDate: {
                        gte: new Date(),
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

            const { maxTicketCount, eventDate, lastDate } = data;
            if (!maxTicketCount || !eventDate || !lastDate) {
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

    async getEventById(id: string) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    id,
                },
            });

            if (!data) {
                throw new NotFoundException();
            }
            return {
                ok: true,
                message: 'event found successfully',
                data,
            };
        } catch (e) {
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

    async registerEvent(eventId: string, userId: string) {
        try {
            const eventInfo = await this.prismaService.events.findUnique({
                where: {
                    id: eventId,
                },
            });

            if (eventInfo.maxTicketCount <= 0) {
                throw new ServiceUnavailableException();
            }
            const data = await this.prismaService.events.update({
                where: {
                    id: eventId,
                },
                data: {
                    registeredUsers: {
                        connect: {
                            uid: userId,
                        },
                    },
                },
            });

            if (!data) {
                throw new NotFoundException();
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else if (e instanceof ServiceUnavailableException) {
                throw new ServiceUnavailableException();
            } else {
                throw e;
            }
        }
    }

    async getEventParticipants(id: string) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    id,
                },
                select: {
                    registeredUsers: {
                        select: {
                            uid: true,
                            displayName: true,
                            collegeName: true,
                            photoURL: true,
                            isStudent: true,
                            email: true,
                        },
                    },
                },
            });
            if (!data) {
                throw new NotFoundException();
            }
            return {
                ok: true,
                message: 'members found successfully',
                data: data.registeredUsers,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                return e;
            }
        }
    }
    async getEventRegistartionStatus(eventId, userId) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    id: eventId,
                },
                select: {
                    registeredUsers: {
                        where: {
                            uid: userId,
                        },
                    },
                },
            });

            if (!data || !data.registeredUsers.length) {
                throw new NotFoundException();
            }

            return {
                ok: true,
                message: 'User found successfully',
                isRegistred: true,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                return e;
            }
        }
    }
}
