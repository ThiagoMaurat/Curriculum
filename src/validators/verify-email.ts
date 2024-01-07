import { z } from "zod";

export const verifyEmailSchema = z.object({
  code: z.string({
    required_error: "Código obrigatório",
  }),
  email: z
    .string({
      required_error: "Email obrigatório",
    })
    .email({ message: "Email inválido" }),
});

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
