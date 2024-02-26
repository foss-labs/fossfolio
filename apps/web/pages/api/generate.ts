import MistralClient from '@mistralai/mistralai';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'POST') {

        const apiKey = process.env.MISTRAL_API_KEY;

        const client = new MistralClient(apiKey);

        const prompt = req.body

        if(!prompt?.prompt) {
            res.status(400).json({
                ok: false,
                message: 'Prompt is required',
            });
            return;
        }

        try {

            const completion = await client.chat({
                model: 'mistral-large-latest',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are an AI writing assistant that continues existing text based on context from prior text.  You are used for writing descriptions of events in an event managememt platform' +
                            'Give more weight/priority to the later characters than the beginning ones. Make sure to construct complete sentences.',
                    },
                    { role: 'user', content: prompt?.prompt },
                ],
            });
            


            res.status(200).send(completion.choices[0].message.content as string);
        } catch {
            res.status(500).json({
                ok: false,
                message: 'Internal server error',
            });
        }
    }
}
