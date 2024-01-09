import { z } from "zod";

export const resetPasswordFirstStepSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
});

export type ResetPassword = z.infer<typeof resetPasswordFirstStepSchema>;
