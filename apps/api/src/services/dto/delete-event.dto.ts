import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteEventDto {
	@ApiProperty()
	@IsString()
	organizationId: string;
}
