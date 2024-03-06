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
  amount: z.string().optional(),
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
    amount: z
      .string()
      .optional()
      .transform((value) => {
        if (value) {
          return value
            .trim()
            .replaceAll(" ", "")
            .replace(/\./g, "")
            .replaceAll(",", ".");
        }

        return "";
      }),
  })
  .superRefine((data, ctx) => {
    if (data.role === "user" && !data.product) {
      ctx.addIssue({
        code: "custom",
        message: "Produto é obrigatório",
        path: ["product"],
      });
    }
  })
  .superRefine((data, ctx) => {
    if (data.role === "user" && !data.amount) {
      ctx.addIssue({
        code: "custom",
        message: "Valor é obrigatório",
        path: ["amount"],
      });
    }
  });

//action
export const createUserAdminAction = createUserAdmin.extend({
  userRole: z.enum(["supervisor", "collaborator", "coordinator", "user"], {
    required_error: "Cargo é obrigatório",
  }),
});

export type CreateUserAdmin = z.infer<typeof createUserAdmin>;
export type CreateUserAdminFormSchema = z.infer<typeof createUserAdminForm>;
