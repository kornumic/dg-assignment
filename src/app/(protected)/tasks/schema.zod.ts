import z from "zod";

export const GetAllTasksSearchParamsSchema = z
  .object({
    page: z.coerce.number().int().min(1).optional(),
    pageSize: z.coerce.number().int().max(50).optional(),
    query: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    completed: z
      .string()
      .transform((val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
      })
      .optional(),
  })
  .strict();

export type GetAllTasksSearchParams = z.infer<
  typeof GetAllTasksSearchParamsSchema
>;
