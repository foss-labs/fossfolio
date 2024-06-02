import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FFError } from '@api/utils/error';

@Injectable()
export class S3Service {
	private readonly s3Client: S3Client;

	constructor() {
		this.s3Client = new S3Client({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY,
				secretAccessKey: process.env.AWS_SECRET_KEY,
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
