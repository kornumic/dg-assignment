import z from "zod";

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  ownerId: z.string(),
  createdAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const NewTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  completed: z.boolean(),
  ownerId: z.string(),
});

export type NewTask = z.infer<typeof NewTaskSchema>;
