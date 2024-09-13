import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetEventByOrgDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	slug: string;
}
export class GetEventByOrgIdDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	id: string;
}
