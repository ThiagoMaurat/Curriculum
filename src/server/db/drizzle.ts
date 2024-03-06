import { env } from "@/../env.mjs";
import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const sql = postgres(env.PG_CONNECTION_STRING);

export const db = drizzle(sql, { schema: schema });
