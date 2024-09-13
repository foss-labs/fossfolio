import { z } from 'zod';
export const AIFormSchema = z.object({
	prompt: z.string(),
	messages: z.array(
		z.object({
			text: z.string(),
			ai: z.boolean(),
		}),
	),
});

export type AIFormDto = z.infer<typeof AIFormSchema>;
