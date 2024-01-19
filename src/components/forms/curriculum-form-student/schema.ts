import { sendUserCurriculumSchema } from "@/validators/send-user-curriculum";
import { z } from "zod";

export const sendUserCurriculumForm = sendUserCurriculumSchema.extend({
  certificate: z
    .array(z.instanceof(File), {
      required_error: "Selecione pelo menos um arquivo",
      invalid_type_error: "Selecione pelo mens um arquivo",
    })
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
});

export type FormStudent = z.infer<typeof sendUserCurriculumForm>;
