import { DrizzleCertificationRepository } from "../repositories/drizzle/certification-drizzle-repository";
import { DeleteCertificationByIdUseCase } from "../use-cases/delete-certificate-by-id";

export function makeDeleteCertificateFactory() {
  const drizzleUsersRepository = new DrizzleCertificationRepository();

  const deleteCertificationFactory = new DeleteCertificationByIdUseCase(
    drizzleUsersRepository
  );

  return deleteCertificationFactory;
}
