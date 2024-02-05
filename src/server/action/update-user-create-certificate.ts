"use server";

import { action } from "@/lib/safe-action";
import { studentCurriculumAction } from "@/validators/send-user-curriculum";
import { getServerAuthSession } from "../../../auth";
import { db } from "../db/drizzle";
import { certifications, curriculums } from "../db/schema";
import { CertificationInsertSchema } from "../db/types-schema";

export const updateUserAndCreateCertificateAction = action(
  studentCurriculumAction,
  async (data) => {
    const serverSession = await getServerAuthSession();

    if (!serverSession) {
      throw new Error("Unauthorized");
    }

    const updateUserAndCreateCertificate = db.transaction(async (tx) => {
      const [curriculum] = await tx
        .insert(curriculums)
        .values(data)
        .returning();

      if (!curriculum) {
        throw new Error("Erro ao criar curriculo");
      }

      if (data.certification && data.certification.length > 0) {
        const formatCertificate: CertificationInsertSchema[] =
          data.certification.map((data) => {
            return {
              userId: serverSession.user.id,
              url: data.url,
              key: data.key,
              fileName: data.fileName,
              curriculumId: curriculum.id,
            };
          });

        const [certificationCreated] = await tx
          .insert(certifications)
          .values(formatCertificate)
          .returning();

        if (!certificationCreated) {
          throw new Error("Erro ao criar certificação");
        }
      }
    });

    if (!updateUserAndCreateCertificate) {
      throw new Error("Failed to update curriculum");
    }

    return { message: "Criado com sucesso" };
  }
);
