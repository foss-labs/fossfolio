import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventStatus, Mode } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateEventDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    guidelines: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: EventStatus;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mode: Mode;

    @ApiProperty()
    @ValidateIf((o) => o.mode === 'OFFLINE')
    @IsString()
    venue: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Type(() => Date)
    registrationStart: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Type(() => Date)
    eventStarting: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Type(() => Date)
    eventEnding: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Type(() => Date)
    registrationEnd: Date;

    @ApiProperty()
    @IsString()
    twitter?: string;

    @ApiProperty()
    @IsString()
    email?: string;

    @ApiProperty()
    @IsString()
    instagram?: string;

    @ApiProperty()
    @IsString()
    website?: string;

    @ApiProperty()
    @IsString()
    linkedin?: string;

    @ApiProperty()
    @IsString()
    discord?: string;

    @ApiProperty()
    @IsArray()
    teams: Array<string>;

    @ApiProperty()
    @IsArray()
    organizers: Array<string>;

    @ApiProperty()
    @IsArray()
    tags: Array<string>;
}
