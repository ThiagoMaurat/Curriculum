"use server";

import { action } from "@/lib/safe-action";
import { makeUpdateUserAndCreateCertificate } from "@/server/factories/make-update-user-and-generate-certification-factory";
import { studentCurriculumAction } from "@/validators/send-user-curriculum";

export const updateUserAndCreateCertificateAction = action(
  studentCurriculumAction,
  async (data) => {
    const updateUserAndCreateCertificate = makeUpdateUserAndCreateCertificate();

    await updateUserAndCreateCertificate.execute({
      curriculum: {
        fullName: data.fullName,
        fathersName: data.fathersName,
        mothersName: data.mothersName,
        birthday: data.birthday,
        identityDocument: data.identityDocument,
        CRM: data.CRM,
        CPF: data.CPF,
        phone: data.phone,
        address: data.address,
        email: data.email,
        selfDescription: data.selfDescription,
        lattes: data.lattes,
        finalCourseDate: data.finalCourseDate,
        initialCourseDate: data.initialCourseDate,
      },
      certification: data.certification,
      userId: data.userId,
    });

    return { message: "Criado com sucesso" };
  }
);
