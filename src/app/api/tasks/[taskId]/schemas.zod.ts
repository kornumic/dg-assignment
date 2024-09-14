import z from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
