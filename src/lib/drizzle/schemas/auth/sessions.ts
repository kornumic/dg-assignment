import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "@/lib/drizzle/schemas/domain/users";

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
