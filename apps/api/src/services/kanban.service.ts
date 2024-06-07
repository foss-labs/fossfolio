import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { KanbanCardModal } from '@api/models';
import BaseContext from '@api/BaseContext';
import { SystemTable } from '@api/utils/db';
import type { CreateTask } from './dto/create-task.dto';

@Injectable()
export class KanbanService {
	constructor(private prismaService: PrismaService) {}

	async getAllBoards(slug: string) {
		try {
			const allBoards = {};

			if (!allBoards) {
				throw new NotFoundException();
			}

			return {
				ok: true,
				message: 'Boards found',
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

	async createTask(
		payload: CreateTask,
		kanbanId: string,
		user: string,
		eventId: string,
	) {
		try {
			const existingKanban = await BaseContext.knex<SystemTable.Kanban>(
				SystemTable.Kanban,
			)
				.select('*')
				.where({
					fk_event_id: eventId,
					id: kanbanId,
				});

			if (!existingKanban) throw new NotFoundException();

			await KanbanCardModal.insert({
				fk_kanban_id: kanbanId,
				fk_user_id: user,
				title: payload.title,
				description: payload.data?.toLocaleString(),
			});

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

	async deleteBoard(boardId: string, slug: string) {
		try {
			await this.prismaService.events.update({
				where: {
					slug,
				},
				data: {
					kanban: {
						delete: {
							id: boardId,
						},
					},
				},
			});

			return {
				ok: true,
				message: 'kanban deleted successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async updateTaskBoard(taskId: string, boardId: string) {
		try {
			await KanbanCardModal.update(
				{
					id: taskId,
				},
				{
					fk_kanban_id: boardId,
				},
			);

			return {
				ok: true,
				message: 'Task moved successfully',
			};
		} catch {
			throw new InternalServerErrorException();
		}
	}
}
