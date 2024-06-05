import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { type Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import type { CreateTask } from "./dto/create-task.dto";
import { KanbanCardModal, KanbanModal } from "@api/models";
import BaseContext from "@api/BaseContext";
import { SystemTable } from "@api/utils/db";
import type { Event } from "@api/db/schema";

@Injectable()
export class KanbanService {
  constructor(private prismaService: PrismaService) {}

  async getAllBoards(slug: string) {
    try {
      const allBoards = await BaseContext.knex(SystemTable.Events)
        .select(
          "kanban.id as id",
          "kanban.created_at as created_at",
          BaseContext.knex.raw("COUNT(tasks.id) as _count"),
          BaseContext.knex.raw(`
      json_agg(json_build_object(
        'id', tasks.id,
        'title', tasks.title,
        'createdBy', json_build_object(
          'id', task_creator.id,
          'displayName', task_creator.display_name,
          'photoURL', task_creator.photo_url
        ),
        'Comment', (
          SELECT json_agg(json_build_object(
            'id', comments.id,
            'fk_user_id', comments.fk_user_id,
            'fk_event_id', comments.fk_event_id,
            'fk_kanban_card_id', comments.fk_kanban_card_id,
            'fk_kanban_id', comments.fk_kanban_id,
            'comment', comments.comment,
            'is_deleted', comments.is_deleted,
            'created_at', comments.created_at,
            'updated_at', comments.updated_at,
            'owner', json_build_object(
              'id', comment_owner.uid,
              'displayName', comment_owner.display_name,
              'email', comment_owner.email,
              'slug', comment_owner.slug,
              'photoURL', comment_owner.photo_url
            )
          ))
          FROM comments
          JOIN users as comment_owner ON comment_owner.id = comments.fk_user_id
          WHERE comments.fk_kanban_card_id = tasks.id
        )
      )) AS tasks
    `)
        )
        .join("kanban", "kanban.fk_event_id", "events.id")
        .leftJoin(
          "users as kanban_creator",
          "kanban_creator.id",
          "kanban.fk_user_id"
        )
        .leftJoin("kanban_card as tasks", "tasks.fk_kanban_id", "kanban.id")
        .leftJoin(
          "users as task_creator",
          "task_creator.id",
          "tasks.fk_user_id"
        )
        .where("events.slug", slug)
        .groupBy(
          "kanban.id",
          "kanban.created_at",
          "kanban_creator.uid",
          "kanban_creator.display_name",
          "kanban_creator.email",
          "kanban_creator.slug",
          "kanban_creator.photo_url"
        )
        .orderBy("kanban.created_at", "asc");

      if (!allBoards) {
        throw new NotFoundException();
      }

      return {
        ok: true,
        message: "Boards found",
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
    slug: string,
    kanbanId: string,
    user: string
  ) {
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
        message: "task was added successfully",
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
        message: "comment was added",
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
        message: "kanban deleted successfully",
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
        }
      );

      return {
        ok: true,
        message: "Task moved successfully",
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
