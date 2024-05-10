import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudModule } from '../cloud/cloud.module';
import { AiModule } from '../ai/ai.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
    providers: [FormService],
    imports: [PrismaModule, CloudModule, AiModule],
    controllers: [FormController],
})
export class FromModule {}
