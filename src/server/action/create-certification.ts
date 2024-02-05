"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { createCertificationActionSchema } from "@/validators/create-certification";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { CertificationInsertSchema } from "../db/types-schema";
import { db } from "../db/drizzle";
import { certifications } from "../db/schema";

export const createCertificationAction = action(
  createCertificationActionSchema,
  async ({ curriculumId, userId, certification }) => {
    noStore();

    if (
      !certification ||
      certification.length === 0 ||
      !userId ||
      !curriculumId
    ) {
      throw new InvalidCredentialsError();
    }

    const formatCertificate: CertificationInsertSchema[] = certification.map(
      (data) => {
        return {
          userId: userId,
          url: data.url,
          key: data.key,
          fileName: data.fileName,
          curriculumId: curriculumId,
        };
      }
    );

    const [certificationCreated] = await db
      .insert(certifications)
      .values(formatCertificate)
      .returning();

    if (!certificationCreated) {
      throw new Error("Erro ao criar certificação");
    }

    revalidatePath("/edit-form");

    return { message: `Certificado criado.` };
  }
);
