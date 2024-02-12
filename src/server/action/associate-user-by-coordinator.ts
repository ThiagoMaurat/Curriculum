"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "../db/drizzle";
import { curriculums } from "../db/schema";
import { z } from "zod";
import { UserDoesNotHavePermission } from "../errors/user-does-not-have-permission";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { eq } from "drizzle-orm";

export const associateUserByCoordinator = action(
  z.object({
    userRole: z.string(),
    studentId: z.string(),
    collaboratorId: z.string(),
  }),
  async (data) => {
    noStore();

    if (data.userRole !== "coordinator") {
      throw new UserDoesNotHavePermission();
    }

    await db.transaction(async (tx) => {
      const checkStudentId = await tx.query.users
        .findFirst({
          with: {
            roles: {
              columns: {
                name: true,
              },
              where(fields, { inArray }) {
                return inArray(fields.name, ["user"]);
              },
            },
          },
          where(fields, operators) {
            return operators.eq(fields.id, data.studentId);
          },
        })
        .then((res) => {
          if (res?.roles?.[0].name === "user") {
            return res;
          }

          return null;
        });

      if (!checkStudentId) {
        throw new InvalidCredentialsError();
      }

      const checkCollaboratorId = await tx.query.users
        .findFirst({
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
          where(fields, operators) {
            return operators.eq(fields.id, data.collaboratorId);
          },
        })
        .then((res) => {
          if (res?.roles?.[0].name === "collaborator") {
            return res;
          }

          return null;
        });

      if (!checkCollaboratorId) {
        throw new InvalidCredentialsError();
      }

      const updateCurriculum = await tx
        .update(curriculums)
        .set({
          collaboratorId: data.collaboratorId,
          statusCurriculum: "fabrication",
        })
        .where(eq(curriculums.userId, data.studentId))
        .returning();

      if (!updateCurriculum) {
        throw new Error("Failed to update curriculum");
      }
    });

    revalidatePath("/coordinator/kanbam");

    return {
      message: `Currículo atualizado com sucesso.`,
    };
  }
);
