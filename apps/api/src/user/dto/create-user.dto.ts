import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatar: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsString()
    githubID: string;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty()
    @IsBoolean()
    student: boolean;
}
