import { SystemFields, FormInput } from "../../utils/db";
import { z } from "zod";

export const FormFieldSchema = z.object({
  id: z.string().length(25),

  fk_form_id: z.string().length(25),

  name: z.string().min(3).max(255),

  placeholder: z.string().optional(),

  description: z.string().optional(),

  required: z.boolean().default(false),

  type: z.enum(FormInput),

  is_deleted: z.boolean().default(false),

  created_at: z.date(),

  updated_at: z.date(),
});

export type FormField = z.infer<typeof FormFieldSchema>;

export type FormFieldCreateSchema = Omit<
  z.input<typeof FormFieldSchema>,
  SystemFields
>;

export type FormFieldUpdateSchema = Partial<FormFieldCreateSchema>;
