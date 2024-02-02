import { z } from "zod";

export const secondStepSchema = z.object({
  certificate: z
    .unknown()
    .refine((val) => {
      console.log(val);
      if (!Array.isArray(val) || val.length === 0) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "É necessário carregar certificado para o upload")
    .optional()
    .nullable()
    .default(null),
});

export type SecondStepSchema = z.infer<typeof secondStepSchema>;
