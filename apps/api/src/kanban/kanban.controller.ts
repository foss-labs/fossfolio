import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';
import { CreateTask } from './dto/create-task.dto';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

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
}
