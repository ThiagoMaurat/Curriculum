"use server";

import { action } from "@/lib/safe-action";
import { resetPasswordFirstStepSchema } from "@/validators/reset-password-first-step";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/email-templates/reset-password";
import { env } from "../../../env.mjs";
import transporter from "@/lib/node-mailer";

export const resetPasswordFirstStepAction = action(
  resetPasswordFirstStepSchema,
  async ({ email }) => {
    const resetPasswordUUID = randomUUID();

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      throw new Error("Usário não encontrado");
    }

    const [updateUser] = await db
      .update(users)
      .set({
        resetPasswordToken: resetPasswordUUID,
      })
      .where(eq(users.email, email))
      .returning();

    if (!updateUser) {
      throw new Error("Erro ao resetar senha");
    }

    const emailHtml = render(
      ResetPasswordEmail({
        validationCode: resetPasswordUUID,
        email: user.email,
      })
    );

    const emailSent = await transporter.sendMail({
      html: emailHtml,
      from: `${env.GMAIL_MAIL}`,
      subject: "Confirmação de Cadastro",
      to: email,
    });

    if (!emailSent.accepted) {
      throw new Error("Erro ao enviar email");
    }

    return { message: `Usuário criado.` };
  }
);
