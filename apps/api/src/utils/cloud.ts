import Aws from 'aws-sdk';

export class Cloud {
    constructor() {
        Aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: 'us-east-1',
        });
    }

    public s3Instance() {
        return new Aws.S3();
    }
}
