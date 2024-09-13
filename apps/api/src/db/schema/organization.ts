import type { SystemFields } from '../../utils/db';
import { z } from 'zod';

export const OrganizationSchema = z.object({
	id: z.string().length(25),
	name: z.string(),
	slug: z.string(),

	is_verified: z.boolean().default(false),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),
	updated_at: z.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

export type OrganizationCreateSchema = Omit<
	z.input<typeof OrganizationSchema>,
	SystemFields
>;

export type OrganizationUpdateSchema = Partial<OrganizationCreateSchema>;
