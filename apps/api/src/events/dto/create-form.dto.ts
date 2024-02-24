import { ApiProperty } from '@nestjs/swagger';
import { FieldType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormPayLoad {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    eventId: string;

    data: Payload;
}

class Payload {
    label: string;
    placeholder?: string;
    options?: string;
    required: boolean;
    type: FieldType;
}
