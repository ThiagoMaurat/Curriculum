"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { updateCurriculumActionSchema } from "@/validators/update-curriculum";
import { getServerAuthSession } from "../../../auth";
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { curriculums } from "../db/schema";

export const updateCurriculumAction = action(
  updateCurriculumActionSchema,
  async (data) => {
    noStore();
    const serverSession = await getServerAuthSession();
    if (!serverSession?.user) {
      throw new Error("Unauthorized");
    }

    const [curriculum] = await db
      .update(curriculums)
      .set(data)
      .where(eq(curriculums.userId, serverSession.user.id))
      .returning();

    if (!curriculum) {
      throw new Error("Failed to update curriculum");
    }

    revalidateTag("");

    return { message: `Currículo atualizado com sucesso.` };
  }
);
