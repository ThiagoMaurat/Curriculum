import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./drizzle";

(async () => {
  neonConfig.fetchConnectionCache = true;

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Done");
})();
