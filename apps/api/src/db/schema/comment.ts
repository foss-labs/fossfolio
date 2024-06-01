import { z } from 'zod';

import type { SystemFields } from '../../utils/db';

export const CommentSchema = z.object({
	id: z.string().length(25),

	fk_user_id: z.string().length(25),

	fk_event_id: z.string().length(25),

	fk_kanban_card_id: z.string().length(25),

	fk_kanban_id: z.string().length(25),

	comment: z.string().min(3).max(255),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;

export type CommentCreateSchema = Omit<
	z.input<typeof CommentSchema>,
	SystemFields
>;

export type CommentUpdateSchema = Partial<CommentCreateSchema>;
