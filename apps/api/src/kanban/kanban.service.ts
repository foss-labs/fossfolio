import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTask } from './dto/create-task.dto';

@Injectable()
export class KanbanService {
    constructor(private prismaService: PrismaService) {}

    async getAllBoards(slug: string) {
        try {
            const allBoards = await this.prismaService.events.findUnique({
                where: {
                    slug,
                },
                select: {
                    kanban: {
                        include: {
                            tasks: {
                                include: {
                                    createdBy: {
                                        select: {
                                            email: true,
                                            displayName: true,
                                            photoURL: true,
                                        },
                                    },
                                },
                            },
                            createdBy: {
                                select: {
                                    email: true,
                                    displayName: true,
                                    photoURL: true,
                                },
                            },
                            _count: true,
                        },
                    },
                },
            });

            if (!allBoards) {
                throw new NotFoundException();
            }

            return {
                ok: true,
                message: 'Boards found',
                data: allBoards.kanban,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException();
            }

            throw new InternalServerErrorException({
                error: e,
            });
        }
    }

    async createTask(payload: CreateTask, slug: string, kanbanId: string, user: string) {
        try {
            const newKanban = await this.prismaService.events.update({
                where: {
                    slug,
                },
                data: {
                    kanban: {
                        update: {
                            where: {
                                id: kanbanId,
                            },
                            data: {
                                tasks: {
                                    create: {
                                        title: payload.title,
                                        userUid: user,
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!newKanban) throw new InternalServerErrorException();

            const newTask = await this.prismaService.task.findFirst({
                where: {
                    userUid: user,
                    kanbanId: kanbanId,
                    title: payload.title,
                },
            });

            await this.addComment(newTask.id, payload.data, user);

            return {
                ok: true,
                message: 'task was added successfully',
            };
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async addComment(taskId: string, comment: Prisma.JsonValue, userId: string) {
        try {
            const newComment = await this.prismaService.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    Comment: {
                        create: {
                            data: comment,
                            userUid: userId,
                        },
                    },
                },
            });

            if (!newComment) throw new InternalServerErrorException();

            return {
                ok: true,
                message: 'comment was added',
            };
        } catch (e) {
            throw new InternalServerErrorException({
                error: e,
            });
        }
    }
}
