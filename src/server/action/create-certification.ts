"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { createCertificationActionSchema } from "@/validators/create-certification";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { CertificationInsertSchema } from "../db/types-schema";
import { db } from "../db/drizzle";
import { certifications, curriculums } from "../db/schema";
import { and, eq } from "drizzle-orm";

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

    await db.transaction(async (tx) => {
      const formatCertificate: CertificationInsertSchema[] = certification.map(
        (data) => {
          return {
            userId: userId,
            url: data.url,
            key: data.key,
            fileName: data.fileName,
            curriculumId: curriculumId,
            isInsertedAfterCurriculumDone: true,
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

      const [userCurriculum] = await tx
        .select()
        .from(curriculums)
        .where(eq(curriculums.userId, userId));

      if (userCurriculum.generatedPDFUploadedAt) {
        const updateCurriculum = await tx
          .update(curriculums)
          .set({
            statusCurriculum: "revision",
          })
          .where(
            and(
              eq(curriculums.userId, userId),
              eq(curriculums.id, curriculumId)
            )
          )
          .returning();

        if (!updateCurriculum) {
          throw new Error("Erro ao atualizar currículo");
        }
      }

      revalidatePath("/edit-form");
    });

    return { message: `Certificado criado.` };
  }
);
