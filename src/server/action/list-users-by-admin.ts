"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { ilike, or, sql } from "drizzle-orm";
import { paramsSchema } from "@/validators/params-schema";

export const listUsersAction = action(
  paramsSchema,
  async ({ limit, page, sort, search }) => {
    noStore();

    const limitInt = parseInt(limit) ?? 10;
    const pageInt = parseInt(page) ?? 1;

    const usersFindMany = await db.query.users.findMany({
      with: {
        roles: {
          columns: {
            name: true,
          },
        },
        certifications: true,
      },
      limit: limitInt,
      offset: limitInt * (pageInt - 1),
      where(fields, operators) {
        if (search) {
          return operators.or(
            operators.ilike(fields.name, `%${search}%`),
            operators.ilike(fields.email, `%${search}%`)
          );
        }
      },
      orderBy(fields, operators) {
        if (sort === "desc") {
          return operators.desc(fields.createdAt);
        }

        return operators.asc(fields.createdAt);
      },
      columns: {
        createdAt: true,
        email: true,
        id: true,
        name: true,
        product: true,
      },
    });

    const [metadata] = await db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(users)
      .where(
        or(ilike(users.name, `%${search}%`), ilike(users.email, `%${search}%`))
      );

    if (!usersFindMany) {
      return null;
    }

    return {
      user: usersFindMany,
      metadata: {
        lastPage: Math.ceil(metadata.total / pageInt) ?? 1,
        total: metadata.total,
      },
    };
  }
);
