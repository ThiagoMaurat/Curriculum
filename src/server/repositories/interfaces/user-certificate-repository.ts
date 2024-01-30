import { Certification, Curriculum } from "../../db/types-schema";

export interface UsersCertificateRepository {
  listCertificateAssociatedWithUser(
    userId: string
  ): Promise<({} & Curriculum & { certifications: Certification[] }) | null>;
}
