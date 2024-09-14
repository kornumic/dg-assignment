import z from "zod";

export const getTasksSearchOptionsSchema = z
  .object({
    limit: z.coerce.number().int().min(0).max(50).default(10),
    offset: z.coerce.number().int().min(0).default(0),
    query: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    completed: z
      .string()
      .optional()
      .transform((val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
      }),
  })
  .strict();
