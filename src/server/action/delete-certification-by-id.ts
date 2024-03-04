"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { deleteCertificationByIdSchema } from "@/validators/delete-certification-by-id";
import { utapi } from "@/lib/upload-thing";
import { db } from "../db/drizzle";
import { certifications, curriculums } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const deleteCertificationByIdAction = action(
  deleteCertificationByIdSchema,
  async ({ key, userId, curriculumId }) => {
    noStore();
    const deleteFromUploadThing = await utapi.deleteFiles(key);

    if (!deleteFromUploadThing) {
      throw new Error("Failed to delete certificate");
    }

    await db.transaction(async (tx) => {
      const [certificate] = await db
        .delete(certifications)
        .where(
          and(eq(certifications.key, key), eq(certifications.userId, userId))
        )
        .returning();

      if (!certificate) {
        throw new Error("Failed to delete certificate");
      }

      const updateCurriculum = await tx
        .update(curriculums)
        .set({
          statusCurriculum: "revision",
        })
        .where(
          and(eq(curriculums.userId, userId), eq(curriculums.id, curriculumId))
        )
        .returning();

      if (!updateCurriculum) {
        throw new Error("Failed to update curriculum");
      }

      revalidatePath("/edit-form");
    });

    return { message: `Certificação deletada.` };
  }
);
