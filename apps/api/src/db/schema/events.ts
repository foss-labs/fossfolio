import type { SystemFields } from "../../utils/db";
import { z } from "zod";

export const EventSchema = z.object({
  id: z.string().length(25),

  name: z.string().min(3).max(255),

  slug: z.string().min(3).max(255),

  fk_organization_id: z.string().length(25),

  description: z.string().optional(),

  website: z.string().url().optional(),

  cover_image: z.string().url().optional(),

  location: z.string().min(3).max(255),

  event_date: z.date(),

  is_published: z.boolean().default(false),

  is_deleted: z.boolean().default(false),

  created_at: z.date(),

  updated_at: z.date(),
});

export type Event = z.infer<typeof EventSchema>;

export type EventCreateSchema = Omit<z.input<typeof EventSchema>, SystemFields>;

export type EventUpdateSchema = Partial<EventCreateSchema>;
