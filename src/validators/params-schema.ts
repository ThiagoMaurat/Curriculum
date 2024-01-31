import { z } from "zod";

export const paramsSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(8),
  sort: z.string().optional().nullable().default("desc"),
});

export const metadataSchema = z.object({
  total: z.number(),
  page: z.number(),
});

export type ParamsType = z.infer<typeof paramsSchema>;
export type MetadataParams = z.infer<typeof metadataSchema>;
