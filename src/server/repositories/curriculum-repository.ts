import { Curriculum, CurriculumsInsertSchema } from "@/server/db/types-schema";

export interface CurriculumRepository {
  createCurriculum(data: CurriculumsInsertSchema): Promise<Curriculum | null>;
}
