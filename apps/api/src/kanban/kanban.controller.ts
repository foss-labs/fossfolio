import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from '../organization/guards/rbac-member.guard';
import { CreateTask } from './dto/create-task.dto';
import { AuthUser } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UpdateTaskBoard } from './dto/update-task-board';

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
    @Post('/:slug/:boardId')
    async createTask(
        @Param('slug') slug: string,
        @Param('boardId') boardId: string,
        @Body() payload: CreateTask,
        @AuthUser() user: User,
    ) {
        return await this.kanbanService.createTask(payload, slug, boardId, user.uid);
    }

    @ApiOperation({ summary: 'delete a board' })
    @ApiTags('kanban')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    @Delete('/:slug/:boardId')
    async deleteBoard(@Param('slug') slug: string, @Param('boardId') boardId: string) {
        return await this.kanbanService.deleteBoard(boardId, slug);
    }
    @ApiOperation({ summary: 'update task board' })
    @ApiTags('kanban')
    @UseGuards(AuthGuard('jwt'), RbacGuard)
    @Patch('/tasks/:taskId')
    async updateTaskBoard(@Param('taskId') boardId: string, @Body() data: UpdateTaskBoard) {
        return await this.kanbanService.updateTaskBoard(boardId, data.kanbanId);
    }
}
