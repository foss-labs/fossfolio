import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

type Message = {
    text: string;
    ai?: boolean; // Indicate if the message is from the AI
};

const FormArraySchema = z.object({
    title: z.string().describe('Title of the form'),
    description: z.string().optional().describe('Description of the form'),
    fields: z.array(
        z.object({
            label: z.string().describe('Label of the input'),
            placeholder: z.string().optional().describe('Placeholder of the input'),
            required: z.boolean().describe('Whether the input is required or not'),
            type: z
                .enum([
                    'SingleLineText',
                    'LongText',
                    'SingleSelect',
                    'MultiSelect',
                    'Checkbox',
                    'Number',
                    'Email',
                    'URL',
                    'PhoneNumber',
                    'Attachment',
                ])
                .describe('Type of the input'),
            selectOptions: z
                .array(
                    z
                        .object({
                            option: z.string().describe('Option for the select input'),
                        })
                        .describe('Options for the select input'),
                )
                .optional()
                .describe('Options for the select input'),
        }),
    ),
});

const jsonSchema = zodToJsonSchema(FormArraySchema, 'mySchema');

@Injectable()
export class AiService {
    private openAI: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openAI = new OpenAI({
            apiKey: this.configService.get('AI_KEY'),
            baseURL: 'https://api.together.xyz/v1',
        });
    }

    async gptComplete(prompt: string, messages: Message[]): Promise<string> {
        const history = messages.map(
            (message): ChatCompletionMessageParam => ({
                role: message.ai ? 'system' : 'user',
                content: message.text,
            }),
        );

        history.push({
            role: 'user',
            content: prompt,
        } as ChatCompletionMessageParam);

        const chat = await this.openAI.chat.completions.create({
            stream: false,
            model: 'mistralai/Mistral-7B-Instruct-v0.1',
            messages: history,
            max_tokens: 4000,
            temperature: 0.7,
            frequency_penalty: 0.5,
            // @ts-ignore – Together.ai supports schema while OpenAI does not
            response_format: { type: 'json_object', schema: jsonSchema },
        });

        const jsonExtract = chat.choices[0].message.content!.match(/[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/gis);

        if (!jsonExtract) {
            console.log('No JSON found in the response');
            console.log('Retrying!!!!')
            return this.gptComplete(prompt, messages);
        }

        console.log(jsonExtract)

        const output = JSON.parse(jsonExtract[0]);
        return output;
    }
}
