import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
