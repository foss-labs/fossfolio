import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventStatus, Mode } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    mode: Mode;

    @ApiProperty()
    @IsString()
    venue: string;

    @ApiProperty()
    @IsNumber()
    fee: number;

    @ApiProperty()
    @IsString()
    status: EventStatus;

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
    @IsArray()
    tags: Array<string>;

    @ApiProperty()
    @IsArray()
    sponsors: Array<string>;

    @ApiProperty()
    twitter: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    instagram: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    linkedin: string;

    @ApiProperty()
    discord: string;

    @ApiProperty()
    faq: any;
}
