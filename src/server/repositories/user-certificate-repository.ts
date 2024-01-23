import { Certification, Users } from "../../db/types-schema";

export interface UsersCertificateRepository {
  listCertificateAssociatedWithUser(
    userId: string
  ): Promise<({} & Users & { certifications: Certification[] }) | null>;
}
