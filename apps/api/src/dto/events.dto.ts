import { z } from 'zod';

export const CreateEventSchema = z.object({
	name: z.string(),

	description: z.string().optional(),

	website: z.string(),

	location: z.string(),

	cover_image: z.string(),

	event_date: z.date(),
});

export const CreateEventParamsSchema = z.object({
	orgId: z.string(),
});

export const EventParamsSchema = z.object({
	orgId: z.string(),
	eventId: z.string(),
});

export const UpdateEventSchema = z.object({
	name: z.string().optional(),

	description: z.string().optional(),

	website: z.string().url().optional(),

	location: z.string().optional(),

	cover_image: z.string().url().optional(),

	is_published: z.boolean().optional(),
});

export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;

export type CreateEventDto = z.infer<typeof CreateEventSchema>;

export type EventParams = z.infer<typeof EventParamsSchema>;
