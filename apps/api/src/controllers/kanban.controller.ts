import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { KanbanService } from '../services/kanban.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { AuthUser } from '../services/auth/decorators/user.decorator';
import { UpdateTaskBoard, IUpdateTaskBoard } from '@api/dto/update-task.dto';
import { ZodValidator } from '@api/validation/zod.validation.decorator';
import { User } from '@api/db/schema';
import type { CreateTask } from '../services/dto/create-task.dto';

@Controller('/events/kanban')
export class KanbanController {
	constructor(private kanbanService: KanbanService) {}

	@ApiOperation({ summary: 'get all kanban boards associated with a event' })
	@ApiTags('kanban')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@Get('/:slug')
	async getAllBoards(@Param('slug') slug: string) {
		return await this.kanbanService.getAllBoards(slug);
	}

	@ApiOperation({ summary: 'create a new task in kanban board' })
	@ApiTags('kanban')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@Post('/:boardId')
	async createTask(
		@Param('boardId') boardId: string,
		@Body() payload: CreateTask,
		@AuthUser() user: User,
	) {
		return await this.kanbanService.createTask(payload, boardId, user.id);
	}

	@ApiOperation({ summary: 'delete a board' })
	@ApiTags('kanban')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@Delete('/:slug/:boardId')
	async deleteBoard(
		@Param('slug') slug: string,
		@Param('boardId') boardId: string,
	) {
		return await this.kanbanService.deleteBoard(boardId, slug);
	}

	@ApiOperation({ summary: 'update task board' })
	@ApiTags('kanban')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@Patch('/tasks/:taskId')
	@ZodValidator({
		body: UpdateTaskBoard,
	})
	async updateTaskBoard(
		@Param('taskId') boardId: string,
		@Body() data: IUpdateTaskBoard,
	) {
		return await this.kanbanService.updateTaskBoard(boardId, data.kanbanId);
	}
}
