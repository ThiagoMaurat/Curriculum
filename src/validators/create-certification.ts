import { z } from "zod";

export const createCertificationActionSchema = z.object({
  certification: z
    .array(
      z.object({
        key: z.string().min(1, { message: "A chave é obrigatória" }),
        url: z.string().min(1, { message: "O link é obrigatório" }),
        fileName: z
          .string()
          .min(1, { message: "O nome do arquivo é obrigatório" }),
      })
    )
    .optional(),
  userId: z.string().min(1, { message: "O ID do usuário é obrigatório" }),
  curriculumId: z
    .number()
    .min(1, { message: "O ID do curriculo é obrigatório" }),
});
