import { z } from "zod";

export const schema = z.object({
  collaboratorId: z.string(),
});

export type AssociateUserByCoordinatorType = z.infer<typeof schema>;
