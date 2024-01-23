import { Certification, Users } from "@/db/types-schema";
import { UsersCertificateRepository } from "../user-certificate-repository";
import { db } from "@/lib/drizzle";

export class DrizzleUsersCertificateDrizzleRepository
  implements UsersCertificateRepository
{
  async listCertificateAssociatedWithUser(
    userId: string
  ): Promise<({} & Users & { certifications: Certification[] }) | null> {
    const [user] = await db.query.users.findMany({
      where(fields, operators) {
        return operators.eq(fields.id, userId);
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
