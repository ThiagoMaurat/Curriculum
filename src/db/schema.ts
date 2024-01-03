import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  json,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  presentationName: varchar("presentationName", { length: 191 }).notNull(),
  fathersName: varchar("fathersName", { length: 191 }).notNull(),
  mothersName: varchar("mothersName", { length: 191 }).notNull(),
  birthday: timestamp("birthday", { mode: "string" }),
  identityDocument: varchar("identityDocument", { length: 80 }).notNull(),
  CRM: varchar("CRM", { length: 80 }).notNull(),
  CPF: varchar("CPF", { length: 80 }).notNull(),
  phone: varchar("phone", { length: 80 }).notNull(),
  address: varchar("adress", { length: 80 }).notNull(),
  lattes: varchar("lattes", { length: 80 }).notNull(),
  selfDescription: text("selfDescription"),
  email: varchar("email", { length: 80 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  emailCodeVerified: varchar("emailCodeVerified", { length: 80 }),
  image: text("image"),
  cpf: varchar("cpf", { length: 80 }).notNull(),
  password: varchar("password", { length: 60 }).notNull(),
  resetPassword: varchar("resetPassword", { length: 60 }),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const roles = pgTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", { enum: ["admin", "user"], length: 50 })
    .notNull()
    .default("user"),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  user: many(users),
}));

export const userRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
