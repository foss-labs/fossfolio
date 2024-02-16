import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/updtate-event.dto';
import { FormPayLoad } from './dto/create-form.dto';
import { S3Service } from '../cloud/cloud.service';
import { GetEventByOrgDto, GetEventByOrgIdDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cloudService: S3Service,
    ) {}

    async createEvent(d: CreateEventDto) {
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
                    eventDate: payload.eventDate || event.eventDate,
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

    async createForm(data: FormPayLoad) {
        try {
            const event = await this.prismaService.events.findUnique({
                where: {
                    organizationId: data.organizationId,
                    id: data.eventId,
                },
            });

            if (!event) {
                throw new NotFoundException();
            }

            const formSchema = await this.prismaService.field.create({
                data: {
                    label: data.data.label,
                    placeholder: data.data.placeholder,
                    required: data.data.required,
                    type: data.data.type,
                    Events: {
                        connect: {
                            id: data.eventId,
                        },
                    },
                },
            });

            return {
                ok: true,
                message: 'schema updated successfully',
                data: formSchema,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                return e;
            }
        }
    }

    async uploadEventCover(file: Express.Multer.File, eventId: string) {
        try {
            const publicUrl = await this.cloudService.uploadFile(file);
            if (!publicUrl) {
                throw new InternalServerErrorException();
            }

            const updatedEventCover = await this.prismaService.events.update({
                where: {
                    id: eventId,
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
                return new InternalServerErrorException();
            }
        }
    }

    async getEventFormScheme(event: string) {
        try {
            const eventSchema = await this.prismaService.events.findUnique({
                where: {
                    id: event,
                },
                select: {
                    form: true,
                },
            });

            if (!eventSchema) {
                return new NotFoundException();
            }

            return {
                ok: true,
                message: 'Event schema found',
                data: eventSchema.form,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                return new NotFoundException();
            } else {
                return e;
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
                },
            });
            if (!event) {
                return new NotFoundException();
            }
            return {
                ok: true,
                message: 'Event schema found',
                data: event,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                return new NotFoundException();
            } else {
                return e;
            }
        }
    }
}
