"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db/drizzle";

export interface ListCoordinatorUsers {
  email: string;
  id: string;
  name: string | null;
  roles: Array<{
    name: "supervisor" | "collaborator" | "coordinator" | "user";
  }>;
}

export const listCoordinatorUsers = async (): Promise<
  ListCoordinatorUsers[]
> => {
  noStore();
  const studentsWaitingDocs = await db.query.users
    .findMany({
      with: {
        roles: {
          columns: {
            name: true,
          },
          where(fields, { inArray }) {
            return inArray(fields.name, ["collaborator"]);
          },
        },
      },
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      },
      columns: {
        email: true,
        id: true,
        name: true,
      },
    })
    .then((res) => {
      return res.filter((item) => {
        return item.roles.length > 0;
      });
    });

  if (!studentsWaitingDocs) {
    throw new Error("Não foi possível carregar coordenadores");
  }

  return studentsWaitingDocs;
};
