import {
  Certification,
  Curriculum,
  CurriculumsInsertSchema,
} from "@/server/db/types-schema";

import { CurriculumRepository } from "../interfaces/curriculum-repository";
import { db } from "@/server/db/drizzle";
import { curriculums } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export class DrizzleCurriculumRepository implements CurriculumRepository {
  async updateCurriculum(
    data: CurriculumsInsertSchema,
    id: string
  ): Promise<Curriculum | null> {
    const [curriculum] = await db
      .update(curriculums)
      .set(data)
      .where(eq(curriculums.userId, id))
      .returning();

    if (!curriculum) {
      return null;
    }

    return curriculum;
  }

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
