import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const NewUserSchema = z.object({
  email: z.string().email(),
  hashedPassword: z.string(),
});

export type NewUser = z.infer<typeof NewUserSchema>;
