import { Certification, Curriculum } from "@/server/db/types-schema";

import { CurriculumRepository } from "../interfaces/curriculum-repository";
import { db } from "@/server/db/drizzle";
import { curriculums } from "@/server/db/schema";

export class DrizzleCurriculumRepository implements CurriculumRepository {
  async createCurriculum(data: Curriculum): Promise<Curriculum | null> {
    const [curriculum] = await db.insert(curriculums).values(data).returning();

    if (!curriculum) {
      return null;
    }

    return curriculum;
  }

  async listCurriculumAndCertificateAssociatedWithUser(
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
