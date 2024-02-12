"use server";

import { action } from "@/lib/safe-action";
import { studentCurriculumAction } from "@/validators/send-user-curriculum";
import { getServerAuthSession } from "../../../auth";
import { db } from "../db/drizzle";
import { certifications, curriculums, users } from "../db/schema";
import { CertificationInsertSchema } from "../db/types-schema";
import { getPresentationName } from "@/helpers/extract-presentation-name";
import { eq } from "drizzle-orm";

export const updateCurriculumAndCreateCertificateAction = action(
  studentCurriculumAction,
  async (data) => {
    const serverSession = await getServerAuthSession();

    if (!serverSession) {
      throw new Error("Unauthorized");
    }

    await db.transaction(async (tx) => {
      const [curriculum] = await tx
        .update(curriculums)
        .set({
          address: data.address,
          birthday: data.birthday,
          collaboratorId: null,
          CPF: data.CPF,
          email: data.email,
          CRM: data.CRM,
          fathersName: data.fathersName,
          fullName: data.fullName,
          createdAt: new Date(),
          finalCourseDate: data.finalCourseDate,
          identityDocument: data.identityDocument,
          lattes: data.lattes,
          phone: data.phone,
          statusCurriculum: "selection",
          selfDescription: data.selfDescription,
          initialCourseDate: data.initialCourseDate,
          mothersName: data.mothersName,
          presentationName: getPresentationName(data.fullName),
          updatedAt: new Date(),
        })
        .where(eq(curriculums.userId, serverSession.user.id))
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

    return { message: "Criado com sucesso" };
  }
);
