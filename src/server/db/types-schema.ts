import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { roles, users, certifications, curriculums, comments } from "./schema";
import { z } from "zod";

// USERS
export const selectUserSchema = createSelectSchema(users);
export type Users = z.infer<typeof selectUserSchema>;

const insertUserSchema = createInsertSchema(users);
export type InsertSchemaUsersType = z.infer<typeof insertUserSchema>;

// ROLES
const selectRolesSchema = createSelectSchema(roles);
export type Roles = z.infer<typeof selectRolesSchema>;
const insertRoleSchema = createInsertSchema(roles);
export type InsertSchemaRolesType = z.infer<typeof insertRoleSchema>;

// CURRICULUM
const curriculumsSchema = createSelectSchema(curriculums);
export type Curriculum = z.infer<typeof curriculumsSchema>;
export const curriculumsInsertSchema = createInsertSchema(curriculums);
export type CurriculumsInsertSchema = z.infer<typeof curriculumsInsertSchema>;

// CERTIFICATIONS
const certificationSchema = createSelectSchema(certifications);
const certificationInsertSchema = createInsertSchema(certifications);
export type Certification = z.infer<typeof certificationSchema>;
export type CertificationInsertSchema = z.infer<
  typeof certificationInsertSchema
>;

//COMMENTS
const commentsSchema = createSelectSchema(comments);
export const commentsInsertSchema = createInsertSchema(comments);
export type Comments = z.infer<typeof commentsSchema>;
export type CommentsInsertSchema = z.infer<typeof commentsInsertSchema>;
