import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { EventsService } from '../events/events.service';
import { EventsModule } from '../events/events.module';
import { S3Service } from '../cloud/cloud.service';
import { StripeService } from '../stripe/stripe.service';

@Module({
    providers: [FormService, EventsService, S3Service, StripeService],
    imports: [PrismaModule, AiModule, EventsModule],
    controllers: [FormController],
})
export class FormModule {}
