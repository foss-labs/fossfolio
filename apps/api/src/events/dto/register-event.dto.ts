import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterEventDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    eventId: string;
}
