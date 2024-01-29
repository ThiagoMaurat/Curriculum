import { z } from "zod";

export const createUserAdmin = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  role: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
    required_error: "Cargo é obrigatório",
  }),
  product: z
    .enum(["Lattes", "Vitae", "Adaptação e Avaliação Curricular"], {
      required_error: "Produto é obrigatório",
      invalid_type_error: "Produto inválido",
    })
    .nullable()
    .optional(),
});

//form
export const createUserAdminForm = z
  .object({
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .email({
        message: "Email inválido",
      }),
    role: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
      required_error: "Cargo é obrigatório",
    }),
    product: z
      .enum(["Lattes", "Vitae", "Adaptação e Avaliação Curricular"], {
        required_error: "Produto é obrigatório",
        invalid_type_error: "Produto inválido",
      })
      .nullable()
      .optional(),
  })
  .refine((data) => data.role !== "user" || data.product, {
    message: "Produto inválido",
    path: ["product"],
  });

//action
export const createUserAdminAction = createUserAdmin.extend({
  userRole: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
    required_error: "Cargo é obrigatório",
  }),
});

export type CreateUserAdmin = z.infer<typeof createUserAdmin>;
export type CreateUserAdminForm = z.infer<typeof createUserAdminForm>;
