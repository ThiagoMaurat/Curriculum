import { DrizzleCurriculumRepository } from "../repositories/drizzle/curriculum-drizzle-repository";
import { GetFormAlreadySentUseCase } from "../use-cases/get-form-already-sent";

export function makeGetFormAlreadySentUserFactory() {
  const drizzleUsersRepository = new DrizzleCurriculumRepository();

  const getFormAlreadySenteUseCaseInput = new GetFormAlreadySentUseCase(
    drizzleUsersRepository
  );

  return getFormAlreadySenteUseCaseInput;
}
