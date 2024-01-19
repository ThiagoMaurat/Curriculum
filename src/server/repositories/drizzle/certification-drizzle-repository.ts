import { Certification, CertificationInsertSchema } from "@/db/types-schema";
import { CertificationsRepository } from "../certification-repository";
import { db } from "@/lib/drizzle";
import { certifications } from "@/db/schema";

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
