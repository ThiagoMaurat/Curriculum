"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { updateCurriculumActionSchema } from "@/validators/update-curriculum";
import { getServerAuthSession } from "../../../auth";
import { eq } from "drizzle-orm";
import { curriculums } from "../db/schema";
import { db } from "../db/drizzle";

export const updateCurriculumAction = action(
  updateCurriculumActionSchema,
  async (data) => {
    noStore();

    const serverSession = await getServerAuthSession();

    if (!serverSession?.user) {
      throw new Error("Unauthorized");
    }

    await db.transaction(async (tx) => {
      const [userCurriculum] = await tx
        .select()
        .from(curriculums)
        .where(eq(curriculums.userId, serverSession.user.id));

      const [curriculum] = await db
        .update(curriculums)
        .set({
          ...data,
          statusCurriculum: userCurriculum.generatedPDFUploadedAt
            ? "revision"
            : userCurriculum.statusCurriculum,
        })
        .where(eq(curriculums.userId, serverSession.user.id))
        .returning();

      if (!curriculum) {
        throw new Error("Failed to update curriculum");
      }

      revalidateTag("");
    });

    return { message: `Currículo atualizado com sucesso.` };
  }
);
