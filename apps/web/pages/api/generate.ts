import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const gpt = new OpenAI({
            apiKey: process.env.OPEN_AI_TOKEN,
        });
        const { prompt } = JSON.parse(req.body);
        if (prompt === 'chess') {
            res.status(200).send('hello india is rtge best in chess');
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
                    { role: 'user', content: prompt },
                ],
                model: 'gpt-3.5-turbo',
            });

            res.status(200).send(completion.choices[0].message.content as string);
            // res.status(200).send(
            //     'Hello this is how ei generations works , when ever user eneter ++ in theier ui open ai api endspoints are called , pretty good right?',
            // );
        } catch {
            res.status(500).json({
                ok: false,
                message: 'Internal server error',
            });
        }
    }
}
