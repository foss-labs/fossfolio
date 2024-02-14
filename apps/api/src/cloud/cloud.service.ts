import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

    async uploadFile(file: Express.Multer.File): Promise<string> {
        try {
            const { mimetype, originalname } = file;
            console.log(file);
            const command = new PutObjectCommand({
                Bucket: 'fossfolio',
                Key: originalname.split(' ').join('-'),
                Body: file.buffer,
                ContentType: mimetype,
            });
            const data = await this.s3Client.send(command);

            return `https://${command.input.Bucket}.s3.amazonaws.com/${command.input.Key}`;
        } catch (error) {
            // Handle error gracefully
            console.error(error);
            return;
        }
    }
}
