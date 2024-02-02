import { InvalidCredentialsError } from "@/server/errors/invalid-credentials";
import {
  Certification,
  CertificationInsertSchema,
} from "@/server/db/types-schema";
import { CertificationsRepository } from "@/server/repositories/interfaces/certification-repository";

interface CreateCertificationUseCaseInput {
  certification:
    | Array<{
        url: string;
        key: string;
        fileName: string;
      }>
    | undefined;
  userId: string;
  curriculumId: number;
}

export class CreateCertificationUseCase {
  constructor(private certificationRepository: CertificationsRepository) {}

  async execute({
    certification,
    curriculumId,
    userId,
  }: CreateCertificationUseCaseInput): Promise<Certification | null> {
    if (
      !certification ||
      certification.length === 0 ||
      !userId ||
      !curriculumId
    ) {
      throw new InvalidCredentialsError();
    }

    const formatCertificate: CertificationInsertSchema[] = certification.map(
      (data) => {
        return {
          userId: userId,
          url: data.url,
          key: data.key,
          fileName: data.fileName,
          curriculumId: curriculumId,
        };
      }
    );

    const certificationCreated =
      await this.certificationRepository.createCertifications(
        formatCertificate
      );

    if (!certificationCreated) {
      throw new Error("Erro ao criar certificação");
    }

    return certificationCreated;
  }
}
