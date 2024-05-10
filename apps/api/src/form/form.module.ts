import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { EventsService } from '../events/events.service';
import { EventsModule } from '../events/events.module';

@Module({
    providers: [FormService, EventsService],
    imports: [PrismaModule, AiModule, EventsModule],
    controllers: [FormController],
})
export class FromModule {}
