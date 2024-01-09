import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

(async () => {
  neonConfig.fetchConnectionCache = true;

  const sql = neon(process.env.PG_CONNECTION_STRING!);
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Done");
})();
