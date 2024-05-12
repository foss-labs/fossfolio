import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';
import { S3Service } from '../cloud/cloud.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventByOrgDto, GetEventByOrgIdDto } from './dto/get-events.dto';
import excludeKey from '../utils/exclude';
import { Events, User } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AiService } from '../ai/ai.service';

@Injectable()
export class EventsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cloudService: S3Service,
        private readonly stripeService: StripeService,
        private readonly eventEmitter: EventEmitter2,
        private readonly AiService: AiService,
    ) {}

    public async getEventById(id: string) {
        return this.prismaService.events.findUnique({
            where: {
                id,
            },
        });
    }

    private async getEventBySlug(id: string) {
        return this.prismaService.events.findUnique({
            where: {
                slug: id,
            },
        });
    }

    async createEvent(d: CreateEventDto, userId: string) {
        try {
            const isEventWithSlugExist = await this.getEventBySlug(d.name);

            const totalCount = await this.prismaService.events.aggregate({
                _count: true,
            });

            let slug: string;

            if (isEventWithSlugExist) {
                slug = `${d.name}-${totalCount._count}`;
            } else {
                slug = d.name;
            }

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
                            ticketPrice: d.ticketPrice,
                            slug,
                        },
                    },
                },
            });

            const newEvent = await this.getEventBySlug(slug);

            // By default these kanban boards are created for each event
            await this.prismaService.events.update({
                where: {
                    id: newEvent.id,
                },
                data: {
                    kanban: {
                        createMany: {
                            data: [
                                {
                                    userUid: userId,
                                    title: 'Todo',
                                },
                                {
                                    userUid: userId,
                                    title: 'In process',
                                },
                                {
                                    userUid: userId,
                                    title: 'completed',
                                },
                            ],
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
                    slug: payload.eventSlug,
                },
            });

            if (!event) {
                throw new NotFoundException("Event doesn't exist");
            }

            const data = await this.prismaService.events.update({
                where: {
                    organizationId: payload.organizationId,
                    slug: payload.eventSlug,
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
                    eventDate: payload.eventDate || event.eventDate,
                },
            });

            if (!data) {
                throw new UnprocessableEntityException("Event couldn't be updated");
            }

            this.eventEmitter.emit('event.updated', data);

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
                throw new InternalServerErrorException({
                    error: e,
                });
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
                    maxTicketCount: {
                        gt: 0,
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
        } catch {
            throw {
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

    async publishEvent(eventSlug: string) {
        try {
            const data = await this.getEventBySlug(eventSlug);

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
                    slug: eventSlug,
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

    async getEventBySlugId(slug: string) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    slug,
                },
                include: {
                    form: true,
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

    async registerEvent(eventSlug: string, userId: string) {
        try {
            const eventInfo = await this.prismaService.events.findUnique({
                where: {
                    slug: eventSlug,
                },
                include: {
                    Ticket: {
                        where: {
                            userUid: userId,
                        },
                    },
                },
            });

            if (eventInfo.Ticket.length) {
                throw new ConflictException();
            }

            if (eventInfo.maxTicketCount <= 0) {
                throw new ServiceUnavailableException();
            }

            // when the event requires a form input we should check if the use has completed the form or not
            // can only be done after creating the response schema

            // After this if the event has a ticket price we will redirect to stripe checkout

            if (eventInfo.ticketPrice > 0) {
                // this will trigger another service layer from the stripeService Event emitter
                return await this.stripeService.createCheckoutSession(eventInfo, userId);
            } else {
                const data = await this.prismaService.events.update({
                    where: {
                        slug: eventSlug,
                    },
                    data: {
                        Ticket: {
                            create: {
                                userUid: userId,
                            },
                        },
                        maxTicketCount: eventInfo.maxTicketCount - 1,
                    },
                });

                if (!data) {
                    throw new NotFoundException();
                }

                return {
                    ok: true,
                    message: 'Event register successfully',
                };
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else if (e instanceof ServiceUnavailableException) {
                throw new ServiceUnavailableException();
            } else if (e instanceof ConflictException) {
                throw new ConflictException('user already registered');
            } else {
                throw e;
            }
        }
    }

    async getEventParticipants(slugId: string) {
        try {
            const userInfo = await this.prismaService.events.findUnique({
                where: {
                    slug: slugId,
                },
                select: {
                    Ticket: {
                        select: {
                            user: true,
                        },
                    },
                },
            });

            if (!userInfo) {
                throw new NotFoundException('Events not found');
            }

            const data = userInfo.Ticket.map((info) =>
                excludeKey<User, 'refreshToken' | 'createdAt'>(info.user, [
                    'refreshToken',
                    'createdAt',
                ]),
            );

            return {
                ok: true,
                message: 'members found successfully',
                data: data,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException('Event not found');
            } else {
                throw e;
            }
        }
    }

    async getEventRegistartionStatus(slugId: string, userId: string) {
        try {
            const data = await this.prismaService.events.findUnique({
                where: {
                    slug: slugId,
                },
                select: {
                    Ticket: {
                        where: {
                            userUid: userId,
                        },
                    },
                },
            });

            if (!data || !data.Ticket.length) {
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
                throw new InternalServerErrorException({
                    error: e,
                });
            }
        }
    }

    async uploadEventCover(file: Express.Multer.File, eventSlug: string) {
        try {
            const publicUrl = await this.cloudService.uploadFile(file);
            if (!publicUrl) {
                return new InternalServerErrorException();
            }

            const updatedEventCover = await this.prismaService.events.update({
                where: {
                    slug: eventSlug,
                },
                data: {
                    coverImage: publicUrl,
                },
            });

            if (!updatedEventCover) {
                throw new InternalServerErrorException();
            }
            return {
                ok: true,
                data: updatedEventCover,
                message: 'image uploaded successfully',
            };
        } catch (e) {
            if (e instanceof InternalServerErrorException) {
                throw new InternalServerErrorException();
            }
        }
    }

    async getTicketInfo(id: string) {
        try {
            const event = await this.prismaService.events.findUnique({
                where: {
                    id,
                },
                select: {
                    eventDate: true,
                    description: true,
                    isCollegeEvent: true,
                    coverImage: true,
                    location: true,
                    name: true,
                },
            });
            if (!event) {
                throw new NotFoundException();
            }

            return {
                ok: true,
                message: 'Event schema found',
                data: event,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                throw e;
            }
        }
    }

    async deleteEvent(eventId: string) {
        try {
            const event = await this.getEventById(eventId);
            // cant delete paid event till we figure out a way to process refund
            if (event.ticketPrice > 0) {
                return new ServiceUnavailableException();
            }

            await this.prismaService.ticket.deleteMany({
                where: {
                    eventsId: eventId,
                },
            });

            await this.prismaService.events.delete({
                where: {
                    id: eventId,
                },
            });

            return {
                ok: true,
                message: 'event was deleted successfully',
            };
        } catch (e) {
            if (e instanceof ServiceUnavailableException) {
                throw new ServiceUnavailableException({
                    message: 'We dont support to delete a paid event',
                });
            }
            throw new InternalServerErrorException({
                error: e,
            });
        }
    }

    async removeParticipant(eventId: string, userId: string) {
        try {
            const isUserExist = await this.prismaService.ticket.findFirst({
                where: {
                    eventsId: eventId,
                    userUid: userId,
                },
            });

            if (!isUserExist) {
                throw new NotFoundException();
            }

            await this.prismaService.ticket.delete({
                where: {
                    id: isUserExist.id,
                },
            });

            return {
                ok: true,
                message: 'user was removed successfully',
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                throw new ServiceUnavailableException();
            }
        }
    }

    async getEventStats(id: string) {
        try {
            const eventInfo = await this.prismaService.events.findUnique({
                where: {
                    slug: id,
                },
            });

            if (!eventInfo) throw new NotFoundException();

            const insights = await this.prismaService.ticket.groupBy({
                by: ['createdAt'],
                where: {
                    eventsId: eventInfo.id,
                },
                _count: true,
            });

            const stats = await this.prismaService.user.aggregate({
                where: {
                    Ticket: {
                        some: {
                            eventsId: eventInfo.id,
                        },
                    },
                },
                _count: true,
            });

            const totalRevenue = stats._count * eventInfo.ticketPrice;

            const data = {
                totalRevenue: totalRevenue || 0,
                totalTickets: stats._count || 0,
                insights: this.aggregateCountsByDay(insights),
            };

            return {
                data,
                message: 'Data Found successfully',
            };
        } catch {
            throw new NotFoundException();
        }
    }
    private aggregateCountsByDay(responses: Insights[]) {
        const aggregatedCounts = {};

        responses.forEach((response) => {
            // Extract the date part from createdAt
            const date = new Date(response.createdAt).toISOString().split('T')[0];

            // Initialize count for the day if not exists
            if (!aggregatedCounts[date]) {
                aggregatedCounts[date] = 0;
            }

            // Add count to the existing count for the day
            aggregatedCounts[date] += response._count;
        });

        return aggregatedCounts;
    }

    @OnEvent('event.updated')
    async handleEventUpdated(event: Events) {
        const embedDescription = await this.AiService.generateEmbedding(
            JSON.stringify(event.description),
        );
        const embedName = await this.AiService.generateEmbedding(JSON.stringify(event.name));
        await this.prismaService
            .$queryRaw`UPDATE public."Events" SET embedding_description = ${embedDescription} WHERE id = ${event.id}`;
        await this.prismaService
            .$queryRaw`UPDATE public."Events" SET embedding_title = ${embedName} WHERE id = ${event.id}`;
<<<<<<< HEAD
=======
    }

    async deleteForm(slug: string) {
        try {
            await this.prismaService.events.update({
                where: {
                    slug,
                },
                data: {
                    form: {
                        deleteMany: {},
                    },
                },
            });
            return {
                ok: true,
                message: 'form deleted successfully',
            };
        } catch {
            throw new InternalServerErrorException();
        }
>>>>>>> dev
    }
}

type Insights = {
    _count: number;
    createdAt: Date;
};
