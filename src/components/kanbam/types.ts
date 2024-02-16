import { CurriculumStatus } from "@/server/db/schema";
import { Certification, Comments, Roles } from "@/server/db/types-schema";

export type CommentsWithUser = Comments & {
  users: {
    name: string | null;
    email: string;
    image: string | null;
  } | null;
};

export type Card = {
  id: number;
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
  } | null;
  certifications?: Certification[];
  comments: CommentsWithUser[];
  collaborators?: {
    name: string | null;
    email: string;
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
