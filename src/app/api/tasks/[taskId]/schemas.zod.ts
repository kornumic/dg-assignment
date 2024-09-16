import z from "zod";

export const NewTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
});

export type NewTask = z.infer<typeof NewTaskSchema>;

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
