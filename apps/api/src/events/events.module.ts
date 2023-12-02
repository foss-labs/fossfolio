import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsController } from './events.controller';

@Module({
    providers: [EventsService],
    imports: [PrismaModule],
    controllers: [EventsController],
})
export class EventsModule {}
