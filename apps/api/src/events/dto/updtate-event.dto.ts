import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEventDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    name?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    website?: string;
    @ApiProperty()
    location?: string;
    @ApiProperty()
    lastDate?: Date;
}
