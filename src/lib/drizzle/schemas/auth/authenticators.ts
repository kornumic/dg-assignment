import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "@/lib/drizzle/schemas/domain/users";

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").unique().notNull(),
    userId: uuid("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);
