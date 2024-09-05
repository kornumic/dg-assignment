import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ENV } from "@/lib/env";
import * as schema from "./schemas/index.js";

const client = new Client({
  connectionString: ENV.DATABASE_URL,
});

await client.connect();
export const db = drizzle(client, { schema });
