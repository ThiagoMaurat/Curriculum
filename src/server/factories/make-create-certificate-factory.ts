import { DrizzleCertificationRepository } from "../repositories/drizzle/certification-drizzle-repository";
import { CreateCertificationUseCase } from "../use-cases/create-certificate";

export function makeCreateCertificationFactory() {
  const drizzleUsersRepository = new DrizzleCertificationRepository();

  const createCertifications = new CreateCertificationUseCase(
    drizzleUsersRepository
  );

  return createCertifications;
}
