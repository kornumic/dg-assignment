import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ENV } from "@/lib/env";

import * as users from "@/lib/drizzle/schema/users/schema";
import * as tasks from "@/lib/drizzle/schema/tasks/schema";

const client = new Client({
  connectionString: ENV.DATABASE_URL,
});

await client.connect();
export const db = drizzle(client, {
  schema: {
    ...users,
    ...tasks,
  },
});
