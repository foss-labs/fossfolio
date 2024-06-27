import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FFError } from '@api/utils/error';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
	private readonly s3Client: S3Client;

	constructor(private readonly configService: ConfigService) {
		this.s3Client = new S3Client({
			region: this.configService.get('AWS_REGION') as string,
			credentials: {
				accessKeyId: this.configService.get('AWS_ACCESS_KEY') as string,
				secretAccessKey: this.configService.get('AWS_SECRET_KEY') as string,
			},
		});
	}

	async uploadFile(file: Express.Multer.File) {
		try {
			const { mimetype, originalname } = file;
			const command = new PutObjectCommand({
				// TODO: @DarkPhoenix2704 - Make the Bucket name Configurable
				Bucket: 'fossfolio',
				Key: originalname.split(' ').join('-'),
				Body: file.buffer,
				ContentType: mimetype,
			});
			const data = await this.s3Client.send(command);

			return `https://${command.input.Bucket}.s3.amazonaws.com/${command.input.Key}`;
		} catch (error) {
			FFError.uploadAttachmentError('Error uploading attachment');
		}
	}
}
