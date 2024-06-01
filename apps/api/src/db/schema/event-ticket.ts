import type { SystemFields } from '../../utils/db';
import { z } from 'zod';

export const EventTicketSchema = z.object({
	id: z.string().length(25),

	fk_event_id: z.string().length(25),

	name: z.string().min(3).max(255),

	description: z.string(),

	price: z.number().min(0),

	quantity: z.number().min(0),

	stripe_price_object: z.record(z.unknown()).optional(),

	stripe_product_object: z.record(z.unknown()).optional(),

	is_active: z.boolean().default(false),

	is_deleted: z.boolean().default(false),

	created_at: z.date(),

	updated_at: z.date(),
});

export type EventTicket = z.infer<typeof EventTicketSchema>;

export type EventTicketCreateSchema = Omit<
	z.input<typeof EventTicketSchema>,
	SystemFields
>;

export type EventTicketUpdateSchema = Partial<EventTicketCreateSchema>;
