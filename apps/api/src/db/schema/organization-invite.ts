import { z } from 'zod';

import type { SystemFields } from '../../utils/db';
import { Role } from '../../utils/db';

export const OrganizationInviteSchema = z.object({
	id: z.string().length(25),

	fk_organization_id: z.string().length(25),

	invitee_email: z.string().email(),

	inviter_uid: z.string().length(25),

	role: z.enum([Role.ADMIN, Role.EDITOR, Role.VIEWER]),

	created_at: z.date(),

	updated_at: z.date(),

	is_deleted: z.boolean().default(false),
});

export type OrganizationInvite = z.infer<typeof OrganizationInviteSchema>;

export type OrganizationInviteCreateSchema = Omit<
	z.input<typeof OrganizationInviteSchema>,
	SystemFields
>;

export type OrganizationInviteUpdateSchema =
	Partial<OrganizationInviteCreateSchema>;
