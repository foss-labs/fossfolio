import { z } from "zod";

export const UpdateTaskBoard = z.object({
  kanbanId: z.string(),
});

export type IUpdateTaskBoard = z.infer<typeof UpdateTaskBoard>;
