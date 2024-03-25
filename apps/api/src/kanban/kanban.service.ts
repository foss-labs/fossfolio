import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
