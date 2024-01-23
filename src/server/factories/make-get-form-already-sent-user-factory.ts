import { DrizzleUsersCertificateDrizzleRepository } from "../repositories/drizzle/user-certificate-drizzle-repository";
import { GetFormAlreadySentUseCase } from "../use-cases/get-form-already-sent";

export function makeGetFormAlreadySentUserFactory() {
  const drizzleUsersRepository = new DrizzleUsersCertificateDrizzleRepository();

  const getFormAlreadySenteUseCaseInput = new GetFormAlreadySentUseCase(
    drizzleUsersRepository
  );

  return getFormAlreadySenteUseCaseInput;
}
