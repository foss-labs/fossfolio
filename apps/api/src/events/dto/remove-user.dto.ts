import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveUserDto {
    @ApiProperty()
    @IsString()
    organizationId: string;

    @ApiProperty()
    @IsString()
    eventId: string;

    @ApiProperty()
    @IsString()
    userId: string;
}
