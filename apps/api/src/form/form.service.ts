import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { EventsService } from '../events/events.service';
import { FormPayLoad } from './dto/create-form.dto';

@Injectable()
export class FormService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly AiService: AiService,
        private readonly EventService: EventsService,
    ) {}

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
                    options: data.data.options,
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
                throw e;
            }
        }
    }

    async toggleFormPublishStatus(eventSlug: string, shouldPublish: boolean) {
        try {
            const event = await this.prismaService.events.findUnique({
                where: {
                    slug: eventSlug,
                },
                select: {
                    form: true,
                },
            });
            if (!event) {
                throw new NotFoundException();
            }

            if (!event.form.length) {
                throw new InternalServerErrorException();
            }

            const newEventStatus = await this.prismaService.events.update({
                where: {
                    slug: eventSlug,
                },
                data: {
                    isFormPublished: shouldPublish,
                },
            });

            return {
                ok: 'true',
                message: 'form status was changed',
                data: newEventStatus,
            };
        } catch (e) {
            if (e instanceof InternalServerErrorException) {
                throw new InternalServerErrorException({
                    message: 'Please create a form schema to publish the form',
                });
            }
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            }

            return e;
        }
    }

    async getEventFormScheme(eventSlug: string) {
        try {
            const eventSchema = await this.prismaService.events.findUnique({
                where: {
                    slug: eventSlug,
                },
                select: {
                    form: true,
                },
            });

            if (!eventSchema) {
                throw new NotFoundException();
            }

            return {
                ok: true,
                message: 'Event schema found',
                data: eventSchema.form,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                throw e;
            }
        }
    }

    public async addUserFormSubmission(
        info: Record<string, string | Array<string>>,
        eventId: string,
        userId: string,
    ) {
        const event = await this.EventService.getEventById(eventId);
        if (!event) return new NotFoundException();

        await this.prismaService.response.create({
            data: {
                data: info,
                user: {
                    connect: {
                        uid: userId,
                    },
                },
                Events: {
                    connect: {
                        id: event.id,
                    },
                },
            },
        });
    }

    async getRegisteredParticipantsFormSubmissions(id: string, userId: string) {
        try {
            const schema = await this.prismaService.events.findUnique({
                where: {
                    slug: id,
                },
                select: {
                    form: true,
                    id: true,
                },
            });

            const label = {};
            schema.form.forEach((el) => {
                label[el.id] = el.label;
            });

            const data = await this.prismaService.response.findMany({
                where: {
                    userUid: userId,
                    eventsId: schema.id,
                },
            });
            if (!data) return new NotFoundException();

            const result = {};

            schema.form.forEach((el) => {
                // @ts-ignore
                if (data[0] && el.id in data[0].data) {
                    result[el.label] = data[0].data[el.id];
                }
            });

            return {
                ok: true,
                data: result,
                message: 'received form successfully',
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            } else {
                throw e;
            }
        }
    }
}
