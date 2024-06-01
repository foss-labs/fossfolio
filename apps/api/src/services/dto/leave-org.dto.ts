import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveOrg {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	organizationId: string;
}
