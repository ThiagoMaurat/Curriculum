import { Certification, Curriculum } from "@/server/db/types-schema";
import { UsersCertificateRepository } from "../user-certificate-repository";
import { db } from "@/lib/drizzle";

export class DrizzleUsersCertificateDrizzleRepository
  implements UsersCertificateRepository
{
  async listCertificateAssociatedWithUser(
    userId: string
  ): Promise<({} & Curriculum & { certifications: Certification[] }) | null> {
    const [user] = await db.query.curriculums.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, userId);
      },
      with: {
        certifications: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
