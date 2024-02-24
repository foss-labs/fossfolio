import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImageUpload {
    @ApiProperty()
    organizationId: string;

    @ApiProperty()
    eventId: string;
}
