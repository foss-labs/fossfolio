import { FormInput } from '@api/utils/db';
import { z } from 'zod';

export const CreateFormFieldSchema = z.object({
	name: z.string(),
	placeholder: z.string().optional(),
	required: z.boolean(),
	type: z.enum(FormInput),
	options: z.string().array().optional(),
});

export const EditFormFieldSchema = z.object({
	name: z.string().optional(),
	placeholder: z.string().optional(),
	required: z.boolean().optional(),
	type: z.enum(FormInput).optional(),
	options: z.string().array().optional(),
});

export type CreateFormFieldDto = z.infer<typeof CreateFormFieldSchema>;

export type EditFormFieldDto = z.infer<typeof EditFormFieldSchema>;
