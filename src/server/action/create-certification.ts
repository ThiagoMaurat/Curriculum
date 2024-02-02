"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { createCertificationActionSchema } from "@/validators/create-certification";
import { makeCreateCertificationFactory } from "../factories/make-create-certificate-factory";

export const createCertificationAction = action(
  createCertificationActionSchema,
  async (data) => {
    noStore();
    const registerUserBy = makeCreateCertificationFactory();

    await registerUserBy.execute({
      certification: data.certification,
      curriculumId: data.curriculumId,
      userId: data.userId,
    });

    revalidatePath("/edit-form");

    return { message: `Certificado criado.` };
  }
);
