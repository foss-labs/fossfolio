import { apiHandler } from '@app/config';
import { NextApiResponse, NextApiRequest } from 'next/types';

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { data } = await apiHandler.post('/events/image/upload', {
            file: req.body,
        });

        return res.status(201).json({
            ok: true,
            url: 'https://aws-east/s3/blob-path',
        });
    } catch {
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
