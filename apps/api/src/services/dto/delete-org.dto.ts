import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOrgDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	organizationId: string;
}
