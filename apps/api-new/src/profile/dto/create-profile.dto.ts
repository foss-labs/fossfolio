import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
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
    avatar: string;

    @ApiProperty()
    @IsBoolean()
    student?: boolean;

    @ApiProperty()
    @IsArray()
    organized?: string[];

    @ApiProperty()
    @IsArray()
    participated?: string[];
}
