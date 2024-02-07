import { CurriculumStatus } from "@/server/db/schema";
import { Curriculum, Certification } from "@/server/db/types-schema";

export type Card = {
  email: string;
  name: string | null;
  id: string;
  product: string | null;
  amount: string;
  createdAt: Date;
  statusCurriculum: CurriculumStatus;
  curriculums: Curriculum | null;
  certifications: Certification[];
};

export type List = {
  id: string;
  title: string;
};

export type Board = {
  id: string;
  title: string;
};

export type ListWithCards = List & { cards: Card[] | undefined };

export type CardWithList = Card & { list: List };
