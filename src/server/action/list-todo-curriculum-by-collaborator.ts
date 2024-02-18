"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "../db/drizzle";
import { z } from "zod";

noStore();
export const listTodoCurriculumByCollaborator = action(
  z.object({
    roleName: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
    collaboratorId: z
      .string()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
    curriculumId: z
      .number()
      .min(1, { message: "Id do curriculo é obrigatório" }),
  }),
  async ({ roleName, collaboratorId, curriculumId }) => {
    if (roleName !== "collaborator") {
      throw new Error("Sem permissão");
    }

    const collaboratorCurriculum = await db.query.curriculums.findFirst({
      with: {
        collaborators: {
          columns: {
            name: true,
            email: true,
            id: true,
          },
        },
        certifications: true,
      },
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, curriculumId),
          eq(fields.collaboratorId, collaboratorId)
        );
      },
    });

    return {
      collaboratorCurriculum,
    };
  }
);
