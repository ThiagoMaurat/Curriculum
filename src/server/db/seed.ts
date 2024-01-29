import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { db } from "./drizzle";
import { roles, users } from "./schema";
import { randomUUID } from "crypto";

const main = async () => {
  neonConfig.fetchConnectionCache = true;

  const user = await db
    .insert(users)
    .values([
      {
        email: "supervisor@user.com",
        id: randomUUID(),
        password: "123456",
        emailVerified: new Date(),
        name: "Supervisor",
      },
      {
        email: "collaborator@user.com",
        id: randomUUID(),
        password: "123456",
        emailVerified: new Date(),
        name: "Collaborator",
      },
      {
        email: "coordinator@user.com",
        id: randomUUID(),
        password: "123456",
        emailVerified: new Date(),
        name: "Coordinator",
      },
    ])
    .returning();

  if (user && user.length > 0) {
    await db.insert(roles).values([
      {
        id: 1,
        name: "supervisor",
        userId: user[0].id,
      },
      {
        id: 2,
        name: "collaborator",
        userId: user[1].id,
      },
      {
        id: 3,
        name: "coordinator",
        userId: user[2].id,
      },
      {
        id: 4,
        name: "user",
        userId: user[3].id,
      },
    ]);
  }

  console.log("Seed done");
};

try {
  main();
} catch (error) {
  console.error(error);
}
