import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "@/lib/env";

import * as users from "@/lib/drizzle/schema/users/schema";
import * as tasks from "@/lib/drizzle/schema/tasks/schema";

export const dbConnection = async () => {
  const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
  });

  await pool.connect();
  return drizzle(pool, {
    schema: {
      ...users,
      ...tasks,
    },
  });
};

export type DrizzleDbType = Awaited<ReturnType<typeof dbConnection>>;
