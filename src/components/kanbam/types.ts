import { CurriculumStatus } from "@/server/db/schema";
import { Certification, Roles } from "@/server/db/types-schema";

export type Card = {
  collaboratorId: string | null;
  collaboratorName?: string | null;
  statusCurriculum: CurriculumStatus;
  user: {
    email: string;
    name: string | null;
    id: string;
    product: string | null;
    amount: string;
    createdAt: Date;
    roles: Array<{
      name: Roles["name"];
    }>;
    certifications?: Certification[];
  } | null;
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
