"use server";

import { action } from "@/lib/safe-action";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";
import { makeUpdateCurriculumFactory } from "../factories/make-update-curriculum-factory";
import { updateCurriculumActionSchema } from "@/validators/update-curriculum";

export const updateCurriculumAction = action(
  updateCurriculumActionSchema,
  async (data) => {
    noStore();
    const updateCurriculumAction = makeUpdateCurriculumFactory();

    await updateCurriculumAction.execute(data);

    revalidateTag("");

    return { message: `Currículo atualizado com sucesso.` };
  }
);
