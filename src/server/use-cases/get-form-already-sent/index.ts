import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exists";
import { Certification, Curriculum } from "@/server/db/types-schema";
import { CurriculumRepository } from "@/server/repositories/interfaces/curriculum-repository";

interface GetFormAlreadySenteUseCaseInput {
  userId: string;
}

export type GetFormAlreadySenteUserCaseOutput = {} & Curriculum & {
    certifications: Certification[];
  };

export class GetFormAlreadySentUseCase {
  constructor(private curriculumRepository: CurriculumRepository) {}

  async execute({
    userId,
  }: GetFormAlreadySenteUseCaseInput): Promise<GetFormAlreadySenteUserCaseOutput> {
    if (!userId) {
      throw new InvalidCredentialsError();
    }

    const user =
      await this.curriculumRepository.listCurriculumAndCertificateAssociatedWithUser(
        userId
      );

    if (!user) {
      throw new UserDoesNotExistsError();
    }

    return {
      ...user,
      certifications: user.certifications,
    };
  }
}
