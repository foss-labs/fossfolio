import { FormInput } from '@api/utils/db';
import { z } from 'zod';

export const CreateFormFieldSchema = z.object({
	label: z.string(),
	placeholder: z.string().optional(),
	require: z.boolean(),
	type: z.enum(FormInput),
});

export const EditFormFieldSchema = z.object({
	label: z.string().optional(),
	placeholder: z.string().optional(),
	require: z.boolean().optional(),
	type: z.enum(FormInput).optional(),
});

export type CreateFormFieldDto = z.infer<typeof CreateFormFieldSchema>;

export type EditFormFieldDto = z.infer<typeof EditFormFieldSchema>;
