import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { roles, users, certifications } from "./schema";
import { z } from "zod";

export const selectUserSchema = createSelectSchema(users);
export type Users = z.infer<typeof selectUserSchema>;

const insertUserSchema = createInsertSchema(users);
export type InsertSchemaUsersType = z.infer<typeof insertUserSchema>;

const selectRolesSchema = createSelectSchema(roles);
export type Roles = z.infer<typeof selectRolesSchema>;

const certificationSchema = createSelectSchema(certifications);
const certificationInsertSchema = createInsertSchema(certifications);
export type Certification = z.infer<typeof certificationSchema>;
export type CertificationInsertSchema = z.infer<
  typeof certificationInsertSchema
>;
