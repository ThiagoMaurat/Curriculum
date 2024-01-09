import { z } from "zod";

export const resetPasswordSecondStepSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    code: z.string().min(1, {
      message: "Código obrigatório",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senha não confere",
    path: ["confirmPassword"],
  });

export type ResetPasswordSecondStepType = z.infer<
  typeof resetPasswordSecondStepSchema
>;
