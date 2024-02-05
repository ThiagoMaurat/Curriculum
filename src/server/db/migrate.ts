import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

(async () => {
  neonConfig.fetchConnectionCache = true;

  const sql = neon(process.env.PG_CONNECTION_STRING!);
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Done");
})();
