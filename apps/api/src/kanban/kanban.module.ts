import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KanbanController } from './kanban.controller';

@Module({
    providers: [KanbanService],
    imports: [PrismaModule],
    controllers: [KanbanController],
})
export class KanbanModule {}
