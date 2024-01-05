"use server";

import { action } from "@/lib/safe-action";
import { makeRegistryFactory } from "@/server/factories/make-register-use-case";
import { signUpSchema } from "@/validators/signup";

export const signUpAction = action(signUpSchema, async (data) => {
  const regosterFactory = makeRegistryFactory();

  await regosterFactory.execute({
    ...data,
  });

  return { message: `Usuário criado.` };
});
