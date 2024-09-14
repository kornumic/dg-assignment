import z from "zod";

export interface Task {
  id: string;
  title: string;
  description: string | undefined;
  completed: boolean;
  ownerId: string;
  createdAt: Date;
}

export interface NewTask {
  title: string;
  description?: string;
  completed: boolean;
  ownerId: string;
}

export const newTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
