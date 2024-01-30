"use server";

import { action } from "@/lib/safe-action";
import { createPasswordSchemaAction } from "@/validators/create-password";
import { makeRegistryCreatePassword } from "../factories/make-create-password-factory";
import { unstable_noStore as noStore } from "next/cache";

export const registerPasswordAction = action(
  createPasswordSchemaAction,
  async (data) => {
    noStore();
    const registerPasswordAction = makeRegistryCreatePassword();

    await registerPasswordAction.execute({
      confirmPassword: data.confirmPassword,
      password: data.password,
      email: data.email,
    });

    return { message: `Senha criada.` };
  }
);
