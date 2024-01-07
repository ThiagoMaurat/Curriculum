"use server";

import { action } from "@/lib/safe-action";
import { makeValidateCodeEmailFactory } from "@/server/factories/make-validate-code-email-factory";
import { verifyEmailSchema } from "@/validators/verify-email";

export const validateEmailCodeAction = action(
  verifyEmailSchema,
  async (data) => {
    const validateCodeEmailFactory = makeValidateCodeEmailFactory();

    const validateCodeEmail = await validateCodeEmailFactory.execute({
      ...data,
    });

    return validateCodeEmail;
  }
);
