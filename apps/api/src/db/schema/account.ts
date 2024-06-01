import type { SystemFields } from '../../utils/db';
import { z } from 'zod';

export const AccountSchema = z.object({
	id: z.string().length(25),

	fk_user_id: z.string().length(25),

	provider: z.string(),
	provider_account_id: z.string(),

	provider_access_token: z.string().optional(),
	provider_refresh_token: z.string().optional(),

	created_at: z.date(),
	updated_at: z.date(),

	is_deleted: z.boolean().default(false),
});

export type Account = z.infer<typeof AccountSchema>;

export type AccountCreateSchema = Omit<
	z.input<typeof AccountSchema>,
	SystemFields
>;

export type AccountUpdateSchema = Partial<AccountCreateSchema>;
