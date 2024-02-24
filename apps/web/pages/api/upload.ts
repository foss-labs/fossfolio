import { ENV } from '@app/config';
import { NextApiResponse, NextApiRequest } from 'next/types';
import Aws from 'aws-sdk';

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
    Aws.config.update({
        accessKeyId: ENV.aws_access_key,
        secretAccessKey: ENV.aws_secret_key,
        region: 'us-east-1',
    });
    try {
        const s3 = new Aws.S3();
        const file = req.body || '';
        const contentType = req.headers['content-type'] || 'text/plain';
        const fileName = req.headers['x-vercel-filename'] || 'file.txt';
        const fileType = `.${contentType.split('/')[1]}`;

        const finalName = fileName.includes(fileType)
            ? (fileName as string)
            : (`${fileName}${fileType}` as string);

        const params = {
            Bucket: 'fossfolio',
            Key: finalName.split(' ').join('-'), // Set the desired S3 path and filename
            Body: file, // File data
        };

        await s3.putObject(params).promise();

        return res.status(200).json({
            ok: true,
            url: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`,
            contentType: contentType,
            downloadUrl: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}?download=1`,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: 'upload failed',
        });
    }
};

export default upload;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb', // Set desired value here
        },
    },
};
