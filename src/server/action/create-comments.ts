"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { commentsInsertSchema } from "../db/types-schema";
import { db } from "../db/drizzle";
import { comments } from "../db/schema";

export const createCommentAction = action(
  commentsInsertSchema,
  async (data) => {
    noStore();

    const createComment = await db.insert(comments).values(data).returning();

    if (!createComment) {
      throw new Error("Erro ao criar comentário");
    }

    revalidatePath("/coordinator/kanbam", "page");

    return { message: `Comentário criado.` };
  }
);
