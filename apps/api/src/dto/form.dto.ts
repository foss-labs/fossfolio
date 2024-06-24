import { z } from 'zod';
export const NewFormSchema = z.object({
	title: z.string(),
	description: z.string(),
});

export type NewFormDto = z.infer<typeof NewFormSchema>;
