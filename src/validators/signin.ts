import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({ message: "Email inválido" }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, {
      message: "Senha deve ter pelo menos 6 caracteres",
    }),
});

export type SignIn = z.infer<typeof signInSchema>;
