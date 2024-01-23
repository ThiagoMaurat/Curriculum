import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exists";
import { Certification, Users } from "@/db/types-schema";
import { UsersCertificateRepository } from "@/server/repositories/user-certificate-repository";

interface GetFormAlreadySenteUseCaseInput {
  userId: string;
}

type GetFormAlreadySenteUserCaseOutput = {} & Pick<
  Users,
  | "CPF"
  | "address"
  | "birthday"
  | "CPF"
  | "CRM"
  | "email"
  | "fathersName"
  | "mothersName"
  | "lattes"
  | "identityDocument"
  | "name"
  | "phone"
  | "presentationName"
  | "selfDescription"
> & { certifications: Certification[] };

export class GetFormAlreadySentUseCase {
  constructor(private userCertificateRepository: UsersCertificateRepository) {}

  async execute({
    userId,
  }: GetFormAlreadySenteUseCaseInput): Promise<GetFormAlreadySenteUserCaseOutput> {
    if (!userId) {
      throw new InvalidCredentialsError();
    }

    const user =
      await this.userCertificateRepository.listCertificateAssociatedWithUser(
        userId
      );

    if (!user) {
      throw new UserDoesNotExistsError();
    }

    return {
      address: user.address,
      birthday: user.birthday,
      CPF: user.CPF,
      CRM: user.CRM,
      email: user.email,
      fathersName: user.fathersName,
      mothersName: user.mothersName,
      lattes: user.lattes,
      identityDocument: user.identityDocument,
      name: user.name,
      phone: user.phone,
      presentationName: user.presentationName,
      selfDescription: user.selfDescription,
      certifications: user.certifications,
    };
  }
}
