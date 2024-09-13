import { z } from 'zod';

import type { SystemFields } from '../../utils/db';

export const FormResponseSchema = z.object({
	id: z.string().length(25),

	fk_form_id: z.string().length(25),

	fk_event_id: z.string().length(25),

	fk_user_id: z.string().length(25).optional(),

	response: z.record(z.unknown()),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type FormResponse = z.infer<typeof FormResponseSchema>;

export type FormResponseCreateSchema = Omit<
	z.input<typeof FormResponseSchema>,
	SystemFields
>;

export type FormResponseUpdateSchema = Partial<FormResponseCreateSchema>;
