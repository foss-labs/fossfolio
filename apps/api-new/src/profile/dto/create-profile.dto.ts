import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    githubID: string;

    @ApiProperty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsString()
    mobile?: string;

    @ApiProperty()
    @IsString()
    bio?: string;

    @ApiProperty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsBoolean()
    student?: boolean;
}
