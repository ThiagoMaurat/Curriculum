import { DrizzleCurriculumRepository } from "../repositories/drizzle/curriculum-drizzle-repository";
import { UpdateCurriculumUseCase } from "../use-cases/update-curriculum";

export function makeUpdateCurriculumFactory() {
  const drizzleCurriculumsRepository = new DrizzleCurriculumRepository();

  const updateCurriculumUseCase = new UpdateCurriculumUseCase(
    drizzleCurriculumsRepository
  );

  return updateCurriculumUseCase;
}
