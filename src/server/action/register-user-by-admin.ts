"use server";

import { action } from "@/lib/safe-action";
import { makeRegistryUserByAdmin } from "../factories/create-user-by-admin";
import { createUserAdminAction } from "@/validators/create-user-admin";

export const registerUserByAdmin = action(
  createUserAdminAction,
  async (data) => {
    const registerUserByAdmin = makeRegistryUserByAdmin();

    await registerUserByAdmin.execute({ ...data });

    return { message: `Usuário criado.` };
  }
);
