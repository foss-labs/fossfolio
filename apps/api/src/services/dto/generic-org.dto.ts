import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenericOrgDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	organizationId: string;
}
