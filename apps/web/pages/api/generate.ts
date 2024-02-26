import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    
    if (req.method === 'POST') {
        const gpt = new OpenAI({
            apiKey: process.env.OPEN_AI_TOKEN,
        });
        const prompt = JSON.parse(req.body);

        if(!prompt?.prompt) {
            res.status(400).json({
                ok: false,
                message: 'Prompt is required',
            });
            return;
        }

        try {
            const completion = await gpt.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are an AI writing assistant that continues existing text based on context from prior text. ' +
                            'Give more weight/priority to the later characters than the beginning ones. Make sure to construct complete sentences.',
                    },
                    { role: 'user', content: prompt?.prompt },
                ],
                model: 'gpt-3.5-turbo',
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
