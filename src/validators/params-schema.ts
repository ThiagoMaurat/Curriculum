import { z } from "zod";

export const paramsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(12),
  sort: z.string().optional().nullable().default("desc"),
});

export const metadataSchema = z.object({
  total: z.number(),
  page: z.number(),
});

export type ParamsType = z.infer<typeof paramsSchema>;
export type MetadataParams = z.infer<typeof metadataSchema>;
