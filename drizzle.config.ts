// this page is responsible for how the Drizzle is gonna behave
// more modifications to the existing system

// something like permissions and others

import type { Config } from "drizzle-kit";
import { env } from "./env.mjs";

// driver is PG because NeonDB is using Postgres
// also process.env doesnt work because it is not under the scope, becuase ENV is under src,
// so we are installing dotenv to solve this problem

export default {
  driver: "pg",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    connectionString: env.PG_CONNECTION_STRING,
  },
  out: "./drizzle",
} satisfies Config;
