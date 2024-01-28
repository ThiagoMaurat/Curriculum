import {
  CertificationInsertSchema,
  Certification,
} from "@/server/db/types-schema";

export interface CertificationsRepository {
  createCertifications(
    data: CertificationInsertSchema[]
  ): Promise<Certification | null>;
}
