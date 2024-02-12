"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore } from "next/cache";
import { compare } from "bcryptjs";
import { db } from "../db/drizzle";
import { curriculums, roles, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { authenticateSchemaAction } from "@/validators/authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

export const authenticateAction = action(
  authenticateSchemaAction,
  async ({ email, password }) => {
    noStore();

    const userDataAuth = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .leftJoin(roles, eq(users.id, roles.userId))
      .leftJoin(curriculums, eq(users.id, curriculums.userId))
      .then(([user]) => {
        return {
          user: user?.user ?? null,
          role: user?.role ?? null,
          hasSendCertification:
            user?.curriculum?.statusCurriculum !== "waiting_docs"
              ? true
              : false,
        };
      });

    const doesPasswordMatches = await compare(
      password,
      userDataAuth.user.password!
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      id: userDataAuth.user.id,
      name: userDataAuth.user.name,
      email: userDataAuth.user.email,
      emailVerified: userDataAuth.user.emailVerified,
      roleName: userDataAuth?.role?.name ?? null,
      image: userDataAuth.user.image,
      hasSendCertification: userDataAuth.hasSendCertification,
    };
  }
);
