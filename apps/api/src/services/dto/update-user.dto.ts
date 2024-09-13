import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	displayName?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	slug?: string;

	photoUrl?: string;

	@ApiProperty()
	@IsBoolean()
	isCollegeStudent?: boolean;

	collegeName?: string;
}
