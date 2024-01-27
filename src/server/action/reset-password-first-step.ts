"use server";

import { action } from "@/lib/safe-action";
import { makeResetPasswordFirstStep } from "@/server/factories/make-reset-password-first-step";
import { resetPasswordFirstStepSchema } from "@/validators/reset-password-first-step";

export const resetPasswordFirstStepAction = action(
  resetPasswordFirstStepSchema,
  async (data) => {
    const resetPassword = makeResetPasswordFirstStep();

    await resetPassword.execute({
      ...data,
    });

    return { message: `Usuário criado.` };
  }
);
