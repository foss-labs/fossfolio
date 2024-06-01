import { ApiProperty } from '@nestjs/swagger';
import type { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTask {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	data: Prisma.JsonValue;
}
