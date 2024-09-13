import { z } from 'zod';
import type { SystemFields } from '../../utils/db';

export const KanbanSchema = z.object({
	id: z.string().length(25),

	fk_event_id: z.string().length(25),

	title: z.string().min(3).max(255),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type Kanban = z.infer<typeof KanbanSchema>;

export type KanbanCreateSchema = Omit<
	z.input<typeof KanbanSchema>,
	SystemFields
>;

export type KanbanUpdateSchema = Partial<KanbanCreateSchema>;
