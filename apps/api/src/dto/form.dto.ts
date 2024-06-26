import { z } from 'zod';
export const NewFormSchema = z.object({
	title: z.string(),
	description: z.string(),
});

export const updateFormSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
});

export type NewFormDto = z.infer<typeof NewFormSchema>;

export type UpdateFormDto = z.infer<typeof updateFormSchema>;
