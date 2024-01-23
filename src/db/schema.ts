import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
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
  name: varchar("name", { length: 191 }),
  presentationName: varchar("presentationName", { length: 191 }),
  fathersName: varchar("fathersName", { length: 191 }),
  mothersName: varchar("mothersName", { length: 191 }),
  birthday: timestamp("birthday", { mode: "date" }),
  identityDocument: varchar("identityDocument", { length: 80 }),
  CRM: varchar("CRM", { length: 80 }),
  CPF: varchar("CPF", { length: 80 }),
  phone: varchar("phone", { length: 80 }),
  address: varchar("adress", { length: 80 }),
  lattes: varchar("lattes", { length: 80 }),
  selfDescription: text("selfDescription"),
  email: varchar("email", { length: 80 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).defaultNow(),
  emailCodeVerified: varchar("emailCodeVerified", { length: 80 }),
  image: text("image"),
  password: varchar("password", { length: 60 }).notNull(),
  resetPassword: varchar("resetPassword", { length: 60 }),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  hasSendCertification: boolean("hasSendCertification").default(false),
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

export const certifications = pgTable("certification", {
  id: serial("id").primaryKey(),
  fileName: varchar("fileName", { length: 191 }).notNull(),
  key: varchar("key", { length: 191 }).notNull(),
  url: varchar("url", { length: 191 }).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  user: many(users),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  certifications: many(certifications),
}));

export const certificatesRelations = relations(certifications, ({ one }) => ({
  user: one(users, {
    fields: [certifications.userId],
    references: [users.id],
  }),
}));
