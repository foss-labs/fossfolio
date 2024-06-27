import { SystemFields } from '@api/utils/db';
import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string().length(25),
	email: z.string().email(),
	display_name: z.string(),
	slug: z.string(),
	photo_url: z.string().optional(),
	college_name: z.string().optional(),
	is_student: z.boolean().optional(),

	refresh_token: z.string(),

	created_at: z.date(),
	updated_at: z.date(),
	is_deleted: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

export type UserCreateSchema = Omit<User, SystemFields>;

export type UserUpdateSchema = Partial<UserCreateSchema>;
