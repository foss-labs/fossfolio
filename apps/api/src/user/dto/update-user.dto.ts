import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    uid: string;

    @ApiProperty()
    @IsString()
    displayName?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    slug?: string;

    photoUrl?: string;
}
