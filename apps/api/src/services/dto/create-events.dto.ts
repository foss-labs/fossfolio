import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	organizationId: string;
	@ApiProperty()
	@IsString()
	website: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	location: string;

	@ApiProperty()
	@IsNumber()
	ticketPrice: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	eventDate: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	isPaidEvent: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	lastDate: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	maxTicketCount: number;
}
