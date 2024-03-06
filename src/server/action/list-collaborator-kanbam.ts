"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db/drizzle";
import { z } from "zod";

export const listCollaboratorKanbamAction = action(
  z.object({
    roleName: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
    collaboratorId: z
      .string()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
  }),
  async ({ roleName, collaboratorId }) => {
    noStore();

    if (roleName !== "collaborator") {
      throw new Error("Sem permissão");
    }

    const studentsFabrication = await db.query.curriculums
      .findMany({
        columns: {
          statusCurriculum: true,
          id: true,
        },
        with: {
          collaborators: {
            columns: {
              name: true,
              email: true,
            },
          },
          user: {
            columns: {
              createdAt: true,
              email: true,
              id: true,
              name: true,
              product: true,
              amount: true,
            },
            with: {
              roles: {
                columns: {
                  name: true,
                },
                where(fields, { eq }) {
                  return eq(fields.name, "user");
                },
              },
            },
          },
          certifications: true,
          comments: {
            with: {
              users: {
                columns: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy(fields, { desc }) {
              return desc(fields.createdAt);
            },
          },
        },
        where(fields, { eq, and }) {
          return and(
            eq(fields.statusCurriculum, "fabrication"),
            eq(fields.collaboratorId, collaboratorId)
          );
        },
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      })
      .then((res) => {
        return res.filter((item) => {
          return item?.user?.roles?.[0]?.name === "user";
        });
      });

    return {
      studentsFabrication,
    };
  }
);
