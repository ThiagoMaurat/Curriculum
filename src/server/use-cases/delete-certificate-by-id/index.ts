import { utapi } from "@/lib/upload-thing";
import { Certification } from "@/server/db/types-schema";
import { CertificationsRepository } from "@/server/repositories/interfaces/certification-repository";
import { deleteCertificationByIdSchema } from "@/validators/delete-certification-by-id";

interface DeleteCertificationByIdUseCaseInput {
  userId: string;
  key: string;
}

export class DeleteCertificationByIdUseCase {
  constructor(private certificationsRepository: CertificationsRepository) {}

  async execute({
    key,
    userId,
  }: DeleteCertificationByIdUseCaseInput): Promise<Certification | null> {
    const validData = deleteCertificationByIdSchema.parse({ key, userId });

    const deleteFromUploadThing = await utapi.deleteFiles(key);

    if (!deleteFromUploadThing) {
      throw new Error("Failed to delete certificate");
    }

    const certificate =
      await this.certificationsRepository.deleteCertificationById(
        validData.key,
        validData.userId
      );

    if (!certificate) {
      throw new Error("Failed to delete certificate");
    }

    return certificate;
  }
}
