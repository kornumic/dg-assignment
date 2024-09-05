import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { tasks } from "@/lib/drizzle/schemas/domain/tasks";

export const users = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));
