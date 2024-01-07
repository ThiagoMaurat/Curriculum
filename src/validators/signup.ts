import { z } from "zod";

export const signUpSchema = z
  .object({
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
    confirmPassword: z
      .string({
        required_error: "Confirme sua senha",
      })
      .min(6, {
        message: "Senha deve ter pelo menos 6 caracteres",
      }),
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(1, {
        message: "Nome deve ter pelo menos 1 caractere",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senha não confere",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
