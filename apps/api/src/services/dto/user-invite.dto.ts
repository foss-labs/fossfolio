import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrgInvite {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		enum: Role,
	})
	@IsNotEmpty()
	role: Role;
}
