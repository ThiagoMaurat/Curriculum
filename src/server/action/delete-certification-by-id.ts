"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { deleteCertificationByIdSchema } from "@/validators/delete-certification-by-id";
import { makeDeleteCertificateFactory } from "../factories/make-delete-certificate-factory";

export const deleteCertificationByIdAction = action(
  deleteCertificationByIdSchema,
  async (data) => {
    noStore();
    const deleteCertificateFactory = makeDeleteCertificateFactory();

    await deleteCertificateFactory.execute({
      ...data,
    });

    revalidatePath("/edit-form");

    return { message: `Certificação deletada.` };
  }
);
