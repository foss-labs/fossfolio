import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	UseGuards,
	FileTypeValidator,
	MaxFileSizeValidator,
} from '@nestjs/common';
import { S3Service } from '@api/services/cloud.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '@api/services/guards/rbac-member.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/cloud')
@ApiTags('Cloud')
export class CloudController {
	constructor(private readonly s3Service: S3Service) {}

	@Post('/upload')
	@UseGuards(AuthGuard('jwt'), RbacGuard)
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Upload image for event cover page' })
	async uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				// file size validators
				validators: [
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // support png,jpg,peg
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), // File size 4 megabytes
				],
			}),
		)
		file: Express.Multer.File,
	) {
		const image = await this.s3Service.uploadFile(file);
		return {
			file: image,
		};
	}
}
