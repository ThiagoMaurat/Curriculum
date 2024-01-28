import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/../env.mjs";
import * as schema from "../server/db/schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(env.PG_CONNECTION_STRING);

export const db = drizzle(sql, { logger: true, schema: schema });
