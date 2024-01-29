import { z } from "zod";

export const createPasswordSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senha não confere",
    path: ["confirmPassword"],
  });

export const createPasswordSchemaAction = z.object({
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
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    })
    .min(1, {
      message: "Email é obrigatório",
    }),
});

export type CreatePassword = z.infer<typeof createPasswordSchema>;
