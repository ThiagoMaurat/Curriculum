"use server";

import { action } from "@/lib/safe-action";
import { makeResetPasswordFirstStep } from "@/server/factories/make-reset-password-first-step";
import { resetPasswordSchema } from "@/validators/reset-password";

export const resetPasswordFirstStepAction = action(
  resetPasswordSchema,
  async (data) => {
    const resetPassword = makeResetPasswordFirstStep();

    await resetPassword.execute({
      ...data,
    });

    return { message: `Usuário criado.` };
  }
);
