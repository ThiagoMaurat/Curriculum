import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { roles, users } from "./schema";
import { z } from "zod";

export const insertUserSchema = createInsertSchema(users);
export type InsertSchemaUsersType = z.infer<typeof insertUserSchema>;

const selectUserSchema = createSelectSchema(users);
export type Users = z.infer<typeof selectUserSchema>;

const selectRolesSchema = createSelectSchema(roles);
export type Roles = z.infer<typeof selectRolesSchema>;
