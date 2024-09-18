import z from "zod";

export const NewTaskFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type NewTaskType = z.infer<typeof NewTaskFormSchema>;

export const UpdateTaskFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.enum(["completed", "notCompleted"]).optional(),
});

export type UpdateTaskFormType = z.infer<typeof UpdateTaskFormSchema>;
