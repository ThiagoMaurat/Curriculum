"use server";

import { action } from "@/lib/safe-action";
import { makeRegistryFactory } from "@/server/factories/make-register-factory";
import { signUpSchema } from "@/validators/signup";

export const signUpAction = action(signUpSchema, async (data) => {
  const registerFactory = makeRegistryFactory();

  await registerFactory.execute({
    ...data,
  });

  return { message: `Usuário criado.` };
});
