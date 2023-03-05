import { Module } from '@nestjs/common';
import { NocoController } from './noco.controller';
import { NocoService } from './noco.service';

@Module({
    controllers: [NocoController],
    providers: [NocoService],
})
export class NocoModule {}
