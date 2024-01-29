"use server";

import { action } from "@/lib/safe-action";
import { makeRegistryUserByAdmin } from "../factories/create-user-by-admin-factory";
import { createUserAdminAction } from "@/validators/create-user-admin";
import { unstable_noStore as noStore } from "next/cache";

export const registerUserByAdmin = action(
  createUserAdminAction,
  async (data) => {
    noStore();
    const registerUserByAdmin = makeRegistryUserByAdmin();

    await registerUserByAdmin.execute({ ...data });

    return { message: `Usuário criado.` };
  }
);
