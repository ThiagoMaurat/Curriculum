"use server";
import { action } from "@/lib/safe-action";
import { resetPasswordSecondStepSchema } from "@/validators/reset-password-second-step";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { hash } from "bcryptjs";

export const resetPasswordSecondStepAction = action(
  resetPasswordSecondStepSchema,
  async ({ code, confirmPassword, email, password }) => {
    if (password !== confirmPassword) {
      throw new Error("Senhas não conferem");
    }

    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.resetPasswordToken, code)));

    if (!user) {
      throw new Error("Usário ou código inválido");
    }

    const newPassword = await hash(password, 6);

    const [updatedUser] = await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.email, email))
      .returning();

    if (!updatedUser) {
      throw new Error("Erro ao alterar senha");
    }

    return { message: `Senha alterada!` };
  }
);
