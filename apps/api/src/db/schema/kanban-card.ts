import { z } from 'zod';

import type { SystemFields } from '../../utils/db';

export const KanbanCardSchema = z.object({
	id: z.string().length(25),

	fk_kanban_id: z.string().length(25),

	title: z.string().min(3).max(255),

	description: z.string().optional(),

	is_deleted: z.boolean().default(false),

	fk_user_id: z.string().length(25),

	created_at: z.date(),

	updated_at: z.date(),
});

export type KanbanCard = z.infer<typeof KanbanCardSchema>;

export type KanbanCardCreateSchema = Omit<
	z.input<typeof KanbanCardSchema>,
	SystemFields
>;

export type KanbanCardUpdateSchema = Partial<KanbanCardCreateSchema>;
