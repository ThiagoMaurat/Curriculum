import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./schema";

const insertUserSchema = createInsertSchema(users);

const selectUserSchema = createSelectSchema(users);
