"use server";
import { action } from "@/lib/safe-action";
import { makeResetPasswordSecondStep } from "@/server/factories/make-reset-password-second-step";
import { resetPasswordSecondStepSchema } from "@/validators/reset-password-second-step";

export const resetPasswordSecondStepAction = action(
  resetPasswordSecondStepSchema,
  async (data) => {
    const resetPassword = makeResetPasswordSecondStep();

    await resetPassword.execute({
      ...data,
    });

    return { message: `Senha alterada!` };
  }
);
