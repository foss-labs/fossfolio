import { ApiProperty } from '@nestjs/swagger';

export class ImageUpload {
	@ApiProperty()
	organizationId: string;

	@ApiProperty()
	eventId: string;
}
