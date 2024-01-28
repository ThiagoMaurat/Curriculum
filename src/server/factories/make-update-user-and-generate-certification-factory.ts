import { UpdateUserAndCreateCertificateUseCase } from "../use-cases/create-curriculum-and-certificate";
import { DrizzleCertificationRepository } from "../repositories/drizzle/certification-drizzle-repository";
import { DrizzleCurriculumRepository } from "../repositories/drizzle/curriculum-drizzle-repository";

export function makeUpdateUserAndCreateCertificate() {
  const darizzleCurriculumRepository = new DrizzleCurriculumRepository();
  const certificationRepository = new DrizzleCertificationRepository();

  const updateUserAndCreateCertificate =
    new UpdateUserAndCreateCertificateUseCase(
      darizzleCurriculumRepository,
      certificationRepository
    );

  return updateUserAndCreateCertificate;
}
