import { z } from "zod";

export const schema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ter pelo menos 3 letras" }),
  presentationName: z.string({
    required_error: "O nome de apresentação é obrigatório",
  }),
  fathersName: z.string({
    required_error: "O nome do pai é obrigatório",
  }),
  mothersName: z.string({
    required_error: "O nome da mão é obrigatório",
  }),
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

      return val;
    }),
  CRM: z
    .string({
      required_error: "O CRM é obrigatório",
    })
    .min(5, "Campo obrigatório"),
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

      return val;
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
  address: z.string({
    required_error: "O endereço é obrigatório",
  }),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email({ message: "Email inválido" }),
  lattes: z.string().optional(),
});
