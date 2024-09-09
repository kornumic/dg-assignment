import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { users } from "@/lib/drizzle/schema/users/schema";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull(),
  created_at: timestamp("created_at").notNull(),
  owner_id: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  users: one(users, {
    fields: [tasks.owner_id],
    references: [users.id],
  }),
}));

export type TasksInferSelect = InferSelectModel<typeof tasks>;
