import { Curriculum } from "@/server/db/types-schema";

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
}
