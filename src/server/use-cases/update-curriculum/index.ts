import { Curriculum } from "@/server/db/types-schema";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import { CurriculumRepository } from "@/server/repositories/interfaces/curriculum-repository";
import { SendUserCurriculum } from "@/validators/send-user-curriculum";
import { updateCurriculumSchema } from "@/validators/update-curriculum";

interface UpdateCurriculumUseCaseInput extends SendUserCurriculum {
  userId: string;
}

export class UpdateCurriculumUseCase {
  constructor(private curriculumRepository: CurriculumRepository) {}

  async execute(
    data: UpdateCurriculumUseCaseInput
  ): Promise<Curriculum | null> {
    if (!data.userId) {
      throw new InvalidCredentialsError();
    }

    const validData = updateCurriculumSchema.parse(data);

    const updateUser = this.curriculumRepository.updateCurriculum(
      validData,
      data.userId
    );

    if (!updateUser) {
      throw new Error("Erro ao atualizar curriculo");
    }

    return updateUser;
  }
}
