import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { tasks } from "@/lib/drizzle/schema/tasks/schema";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password"),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export type UsersInferSelect = InferSelectModel<typeof users>;
