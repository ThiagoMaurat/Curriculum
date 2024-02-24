import { z } from "zod";

export const schema = z.object({
  academicEducation: z.array(
    z.object({
      initialYear: z.coerce.number().min(1900, "Insira uma data"),
      finalYear: z.coerce.number().min(1900, "Insira uma data"),
      subcategory: z.string().min(1, "Insira uma categoria"),
      certifications: z.string().optional(),
      description: z.string().min(1, "Insira uma descrição"),
    })
  ),
  bibliography: z.array(
    z.object({
      initialYear: z.coerce.number().min(1900, "Insira uma data"),
      finalYear: z.coerce.number().min(1900, "Insira uma data"),
      subcategory: z.string().min(1, "Insira uma categoria"),
      certifications: z.string().optional(),
      description: z.string().min(1, "Insira uma descrição"),
    })
  ),
  eventsCongress: z.array(
    z.object({
      initialYear: z.coerce.number().min(1900, "Insira uma data"),
      finalYear: z.coerce.number().min(1900, "Insira uma data"),
      subcategory: z.string().min(1, "Insira uma categoria"),
      certifications: z.string().optional(),
      description: z.string().min(1, "Insira uma descrição"),
    })
  ),
  extracurricularActivities: z.array(
    z.object({
      initialYear: z.coerce.number().min(1900, "Insira uma data"),
      finalYear: z.coerce.number().min(1900, "Insira uma data"),
      subcategory: z.string().min(1, "Insira uma categoria"),
      certifications: z.string().optional(),
      description: z.string().min(1, "Insira uma descrição"),
    })
  ),
  professionalExperience: z.array(
    z.object({
      initialYear: z.coerce.number().min(1900, "Insira uma data"),
      finalYear: z.coerce.number().min(1900, "Insira uma data"),
      subcategory: z.string().min(1, "Insira uma categoria"),
      certifications: z.string().optional(),
      description: z.string().min(1, "Insira uma descrição"),
    })
  ),
});
