import z from "zod";

export const GetAllTasksSearchParamsSchema = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
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
});

export type GetAllTasksSearchParams = z.infer<
  typeof GetAllTasksSearchParamsSchema
>;
