import {
  Certification,
  CertificationInsertSchema,
} from "@/server/db/types-schema";
import { CertificationsRepository } from "../interfaces/certification-repository";
import { db } from "@/server/db/drizzle";
import { certifications } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export class DrizzleCertificationRepository
  implements CertificationsRepository
{
  async deleteCertificationById(
    key: string,
    userId: string
  ): Promise<Certification | null> {
    const [certificate] = await db
      .delete(certifications)
      .where(
        and(eq(certifications.key, key), eq(certifications.userId, userId))
      )
      .returning();

    if (!certificate) {
      return null;
    }

    return certificate;
  }

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
