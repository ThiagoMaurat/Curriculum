import { z } from "zod";

export const sendUserCurriculumSchema = z.object({
  fullName: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ter pelo menos 3 letras" })
    .refine(
      (val) => {
        if (val.length < 3) return false;

        const name = val.trim().split(" ");

        return name.length > 1;
      },
      { message: "O nome deve ser completo" }
    ),
  fathersName: z
    .string({
      required_error: "O nome do pai é obrigatório",
    })
    .optional(),
  mothersName: z
    .string({
      required_error: "O nome da mão é obrigatório",
    })
    .optional(),
  birthday: z
    .date({
      required_error: "A data de nascimento é obrigatório",
    })
    .min(new Date(1900, 0, 1), "Insira uma data de nascimento"),
  identityDocument: z
    .string({
      required_error: "O RG é obrigatório",
    })
    .transform((val, ctx) => {
      const formattedVal = val
        .replaceAll(".", "")
        .replace("-", "")
        .replaceAll("_", "");

      if (formattedVal.length < 9) {
        ctx.addIssue({
          code: "custom",
          message: "Deve possuir 9 caracteres",
        });
      }

      return formattedVal;
    }),
  CRM: z
    .string({
      required_error: "O CRM é obrigatório",
    })
    .optional(),
  CPF: z
    .string({
      required_error: "O CPF é obrigatório",
    })
    .min(11, { message: "Campo obrigatório" })
    .transform((val, ctx) => {
      const formattedVal = val
        .replaceAll(".", "")
        .replace("-", "")
        .replaceAll("_", "");

      if (formattedVal.length < 11) {
        ctx.addIssue({
          code: "custom",
          message: "Deve possuir 11 caracteres",
        });
      }

      return formattedVal;
    }),
  phone: z
    .string({
      required_error: "O telefone é obrigatório",
    })
    .transform((val, ctx) => {
      const formattedVal = val
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")
        .replaceAll("_", "")
        .replaceAll(" ", "")
        .trim();

      if (formattedVal.length < 11) {
        ctx.addIssue({
          code: "custom",
          message: "Deve ser no formato (DDD)99999-9999",
        });
      }

      return formattedVal;
    }),
  address: z
    .string({
      required_error: "O endereço é obrigatório",
    })
    .min(1, { message: "O endereço é obrigatório" }),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email({ message: "Email inválido" }),
  lattes: z.string().optional(),
  selfDescription: z
    .string({
      required_error: "A descrição é obrigatória",
    })
    .optional(),
  initialCourseDate: z.date().min(new Date(1900, 0, 1), "Insira uma data"),
  finalCourseDate: z.date().min(new Date(1900, 0, 1), "Insira uma data"),
});

export const studentCurriculumAction = sendUserCurriculumSchema.extend({
  certification: z
    .array(
      z.object({
        key: z.string().min(1, { message: "A chave é obrigatória" }),
        url: z.string().min(1, { message: "O link é obrigatório" }),
        fileName: z
          .string()
          .min(1, { message: "O nome do arquivo é obrigatório" }),
      })
    )
    .optional(),
  userId: z.string().min(1, { message: "O ID do usuário é obrigatório" }),
});

export type SendUserCurriculum = z.infer<typeof sendUserCurriculumSchema>;

export type SendCurriculumActionUser = z.infer<typeof studentCurriculumAction>;
