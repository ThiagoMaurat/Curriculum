import {
  Certification,
  CertificationInsertSchema,
} from "@/server/db/types-schema";
import { CertificationsRepository } from "../certification-repository";
import { db } from "@/server/db/drizzle";
import { certifications } from "@/server/db/schema";

export class DrizzleCertificationRepository
  implements CertificationsRepository
{
  async createCertifications(
    data: CertificationInsertSchema[]
  ): Promise<Certification | null> {
    const [certification] = await db
      .insert(certifications)
      .values(data)
      .returning();

    if (!certification) {
      return null;
    }

    return certification;
  }
}
