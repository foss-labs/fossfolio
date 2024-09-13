import { Role, type SystemFields } from '../../utils/db';
import { z } from 'zod';

export const OrganizationMemberSchema = z.object({
	id: z.string().length(25),

	fk_organization_id: z.string().length(25),

	fk_user_id: z.string().length(25),

	role: z.enum([Role.ADMIN, Role.EDITOR, Role.VIEWER]),

	created_at: z.date(),

	updated_at: z.date(),

	is_deleted: z.boolean().default(false),
});

export type OrganizationMember = z.infer<typeof OrganizationMemberSchema>;

export type OrganizationMemberCreateSchema = Omit<
	z.input<typeof OrganizationMemberSchema>,
	SystemFields
>;

export type OrganizationMemberUpdateSchema =
	Partial<OrganizationMemberCreateSchema>;
