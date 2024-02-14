import { Module } from '@nestjs/common';
import { S3Service } from './cloud.service';

@Module({
    providers: [S3Service],
    exports: [S3Service],
})
export class CloudModule {}
