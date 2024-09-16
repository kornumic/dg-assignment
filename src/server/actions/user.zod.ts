import z from "zod";

export const SignUpFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;

export const UserActionResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  errors: z.array(
    z.object({
      field: z.enum(["email", "password"]),
      message: z.string(),
    }),
  ),
});

export type UserActionResponse = z.infer<typeof UserActionResponseSchema>;
