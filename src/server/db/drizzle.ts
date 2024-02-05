import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "@/../env.mjs";
import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";

const sql = new Pool({
  connectionString: env.PG_CONNECTION_STRING,
});

export const db = drizzle(sql, { logger: true, schema: schema });
