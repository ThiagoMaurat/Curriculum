"use server";

import { action } from "@/lib/safe-action";
import { createPasswordSchemaAction } from "@/validators/create-password";
import { unstable_noStore as noStore } from "next/cache";
import { hash } from "bcryptjs";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const registerPasswordAction = action(
  createPasswordSchemaAction,
  async ({ confirmPassword, email, password }) => {
    noStore();

    if (confirmPassword !== password) {
      throw new Error("Senhas não conferem");
    }

    const hashedPassword = await hash(password, 6);

    const [user] = await db
      .update(users)
      .set({
        password: hashedPassword,
        createPasswordToken: null,
      })
      .where(eq(users.email, email))
      .returning();

    if (!user) {
      throw new Error("Erro ao criar senha");
    }

    return { message: `Senha criada.` };
  }
);
