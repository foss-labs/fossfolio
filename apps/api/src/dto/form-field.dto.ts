import { FormInput } from '@api/utils/db';
import { z } from 'zod';

export const CreateFormFieldSchema = z.object({
	label: z.string(),
	placeholder: z.string().optional(),
	require: z.boolean(),
	type: z.enum(FormInput),
});

export type CreateFormFieldDto = z.infer<typeof CreateFormFieldSchema>;
