import { Module } from '@nestjs/common';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

@Module({
    controllers: [MiscController],
    providers: [MiscService],
})
export class MiscModule {}
