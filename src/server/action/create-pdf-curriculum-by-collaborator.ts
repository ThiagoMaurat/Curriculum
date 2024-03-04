"use server";

import { action } from "@/lib/safe-action";
import { db } from "../db/drizzle";
import { z } from "zod";
import { curriculums } from "../db/schema";
import { eq } from "drizzle-orm";

export const createCertificateByCollaborator = action(
  z.object({
    roleName: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
    curriculumId: z
      .number()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
    generatedPDFKey: z
      .string()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
    generatedPDPFileName: z
      .string()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
    generatedPDFUrl: z
      .string()
      .min(1, { message: "Id do coordenador obrigatoriedade" }),
  }),
  async ({
    roleName,
    curriculumId,
    generatedPDFKey,
    generatedPDFUrl,
    generatedPDPFileName,
  }) => {
    if (roleName !== "collaborator") {
      throw new Error("Sem permissão");
    }

    const updateCurriculum = await db
      .update(curriculums)
      .set({
        generatedPDFKey: generatedPDFKey,
        generatedPDFUploadedAt: new Date(),
        generatedPDFUrl: generatedPDFUrl,
        generatedPDPFileName: generatedPDPFileName,
        statusCurriculum: "curriculum_send",
      })
      .where(eq(curriculums.id, curriculumId))
      .returning();

    if (!updateCurriculum) {
      throw new Error("Erro ao criar PDF");
    }

    return { message: `PDF criado.` };
  }
);
