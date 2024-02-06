import { z } from "zod";

export const paramsSchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  sort: z.string().optional().nullable().default("desc"),
  search: z.string().optional().nullable(),
});

export const metadataSchema = z.object({
  total: z.number(),
  page: z.number(),
});

export type ParamsType = z.infer<typeof paramsSchema>;
export type MetadataParams = z.infer<typeof metadataSchema>;
