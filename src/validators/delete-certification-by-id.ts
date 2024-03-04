import { z } from "zod";

export const deleteCertificationByIdSchema = z.object({
  key: z.string().min(1, { message: "O id é obrigatório" }),
  userId: z.string().min(1, { message: "O id do usuário é obrigatório" }),
  curriculumId: z
    .number()
    .min(1, { message: "O id do curriculo é obrigatório" }),
});
