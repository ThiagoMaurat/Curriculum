import { CertificationInsertSchema, Certification } from "@/db/types-schema";

export interface CertificationsRepository {
  createCertifications(
    data: CertificationInsertSchema[]
  ): Promise<Certification | null>;
}
