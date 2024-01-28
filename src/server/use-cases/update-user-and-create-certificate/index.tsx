import { UsersRepository } from "@/server/repositories/user-repository";
import { CertificationsRepository } from "@/server/repositories/certification-repository";
import {
  SendUserCurriculum,
  sendUserCurriculumSchema,
} from "@/validators/send-user-curriculum";
import { CertificationInsertSchema } from "@/server/db/types-schema";

interface UpdateUserAndCreateCertificateInput {
  user: SendUserCurriculum;
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
    private usersRepository: UsersRepository,
    private certificationRepository: CertificationsRepository
  ) {}

  async execute({
    user,
    userId,
    certification,
  }: UpdateUserAndCreateCertificateInput) {
    const userValidated = sendUserCurriculumSchema.parse(user);

    if (certification && certification.length > 0) {
      const formatCertificate: CertificationInsertSchema[] = certification.map(
        (data) => {
          return {
            userId: userId,
            url: data.url,
            key: data.key,
            fileName: data.fileName,
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

    const updateUser = await this.usersRepository.updateUser(
      {
        name: userValidated.name,
        presentationName: userValidated.presentationName,
        fathersName: userValidated.fathersName,
        mothersName: userValidated.mothersName,
        birthday: userValidated.birthday,
        identityDocument: userValidated.identityDocument,
        CRM: userValidated.CRM,
        CPF: userValidated.CPF,
        phone: userValidated.phone,
        address: userValidated.address,
        email: userValidated.email,
        selfDescription: userValidated.selfDescription,
        lattes: userValidated.lattes,
        hasSendCertification: true,
      },
      userId
    );

    if (!updateUser) {
      throw new Error("Erro ao atualizar usuário");
    }

    return updateUser;
  }
}
