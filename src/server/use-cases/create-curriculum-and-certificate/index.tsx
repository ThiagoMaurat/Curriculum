import { CertificationsRepository } from "@/server/repositories/certification-repository";
import {
  SendUserCurriculum,
  sendUserCurriculumSchema,
} from "@/validators/send-user-curriculum";
import { CertificationInsertSchema } from "@/server/db/types-schema";
import { CurriculumRepository } from "@/server/repositories/curriculum-repository";
import { getPresentationName } from "@/helpers/extract-presentation-name";

interface UpdateUserAndCreateCertificateInput {
  curriculum: SendUserCurriculum;
  certification:
    | Array<{
        url: string;
        key: string;
        fileName: string;
      }>
    | undefined;
  userId: string;
}

export class UpdateUserAndCreateCertificateUseCase {
  constructor(
    private curriculumRepository: CurriculumRepository,
    private certificationRepository: CertificationsRepository
  ) {}

  async execute({
    curriculum,
    userId,
    certification,
  }: UpdateUserAndCreateCertificateInput) {
    const curriculumValid = sendUserCurriculumSchema.parse(curriculum);

    const curriculumCreated = await this.curriculumRepository.createCurriculum({
      address: curriculumValid.address,
      birthday: curriculumValid.birthday,
      CPF: curriculumValid.CPF,
      CRM: curriculumValid.CRM,
      email: curriculumValid.email,
      fathersName: curriculumValid.fathersName,
      fullName: curriculumValid.fullName,
      identityDocument: curriculumValid.identityDocument,
      lattes: curriculumValid.lattes ?? null,
      mothersName: curriculumValid.mothersName,
      phone: curriculumValid.phone,
      presentationName: getPresentationName(curriculumValid.fullName),
      selfDescription: curriculumValid.selfDescription,
      initialCourseDate: curriculumValid.initialCourseDate,
      finalCourseDate: curriculumValid.finalCourseDate,
      userId: userId,
    });

    if (!curriculumCreated) {
      throw new Error("Erro ao criar curriculo");
    }

    if (certification && certification.length > 0) {
      const formatCertificate: CertificationInsertSchema[] = certification.map(
        (data) => {
          return {
            userId: userId,
            url: data.url,
            key: data.key,
            fileName: data.fileName,
            curriculumId: curriculumCreated.id,
          };
        }
      );

      const certificationCreated =
        await this.certificationRepository.createCertifications(
          formatCertificate
        );

      if (!certificationCreated) {
        throw new Error("Erro ao criar certificação");
      }
    }

    return curriculumCreated;
  }
}
