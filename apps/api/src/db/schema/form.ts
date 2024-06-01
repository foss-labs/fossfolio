import { z } from 'zod';

import type { SystemFields } from '../../utils/db';

export const FormSchema = z.object({
	id: z.string().length(25),

	fk_event_id: z.string().length(25),

	title: z.string().min(3).max(255),

	description: z.string(),

	logo_url: z.string().url().optional(),

	banner_url: z.string().url().optional(),

	confirmation_message: z.string(),

	misc: z.record(z.unknown()),

	is_default_form: z.boolean().default(true),

	is_published: z.boolean().default(false),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type Form = z.infer<typeof FormSchema>;

export type FormCreateSchema = Omit<z.input<typeof FormSchema>, SystemFields>;

export type FormUpdateSchema = Partial<FormCreateSchema>;
