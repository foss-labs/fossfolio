import { z } from 'zod';

import type { SystemFields } from '../../utils/db';

export const TicketSchema = z.object({
	id: z.string().length(25),

	fk_event_id: z.string().length(25),

	fk_user_id: z.string().length(25).optional(),

	fk_event_ticket_id: z.string().length(25),

	paid_amount: z.number(),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export type TicketCreateSchema = Omit<
	z.input<typeof TicketSchema>,
	SystemFields
>;

export type TicketUpdateSchema = Partial<TicketCreateSchema>;
