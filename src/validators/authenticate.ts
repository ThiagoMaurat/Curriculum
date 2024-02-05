import { z } from "zod";

export const authenticateSchemaAction = z.object({
  email: z
    .string()
    .min(1, {
      message: "O email é obrigatório",
    })
    .email({
      message: "O email deve ser válido",
    }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});
