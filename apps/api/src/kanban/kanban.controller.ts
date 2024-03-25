import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/organization/guards/rbac-member.guard';

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
}
