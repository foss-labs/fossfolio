import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskBoard {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    kanbanId: string;
}
