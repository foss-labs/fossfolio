import type { SystemFields } from '../../utils/db';
import { z } from 'zod';

export const FormFieldOptionsSchems = z.object({
	id: z.string().length(25),

	fk_form_id: z.string().length(25),

	fk_field_id: z.string().length(25),

	option: z.string(),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type FormFieldOptions = z.infer<typeof FormFieldOptionsSchems>;

export type FormFieldOptionsCreateSchema = Omit<
	z.input<typeof FormFieldOptionsSchems>,
	SystemFields
>;

export type FormFieldOptionsUpdateSchema =
	Partial<FormFieldOptionsCreateSchema>;
