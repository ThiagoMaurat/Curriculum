import { DrizzleUsersRepository } from "../repositories/drizzle/user-drizzle-repository";
import { UpdateUserAndCreateCertificateUseCase } from "../use-cases/update-user-and-create-certificate";
import { DrizzleCertificationRepository } from "../repositories/drizzle/certification-drizzle-repository";

export function makeUpdateUserAndCreateCertificate() {
  const drizzleUsersRepository = new DrizzleUsersRepository();
  const certificationRepository = new DrizzleCertificationRepository();

  const updateUserAndCreateCertificate =
    new UpdateUserAndCreateCertificateUseCase(
      drizzleUsersRepository,
      certificationRepository
    );

  return updateUserAndCreateCertificate;
}
