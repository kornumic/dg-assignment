import z, { ZodIssue } from "zod";
import { config } from "dotenv";
import path from "path";

config({
  path: path.join(
    __dirname,
    "..",
    "..",
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  AUTH_URL: z.string(),
  AUTH_SECRET: z.string(),
});

export const prettifyIssues = (issues: ZodIssue[]) => {
  if (issues && issues.length > 0) {
    console.error("Invalid environment variables, check the errors below!");
    console.error(issues.toString());
    throw new Error("Invalid environment variables!");
  }
};

export const getEnvIssues = (): z.ZodIssue[] => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) return result.error.issues;
  return [];
};

const issues = getEnvIssues();
prettifyIssues(issues);

export const ENV = envSchema.parse(process.env);
