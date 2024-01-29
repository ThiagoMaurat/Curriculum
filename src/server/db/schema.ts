import { relations } from "drizzle-orm";
import {
  index,
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
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 80 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).defaultNow(),
  emailCodeVerified: varchar("emailCodeVerified", { length: 80 }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 60 }).notNull(),
  resetPassword: varchar("resetPassword", { length: 60 }),
});

export const curriculums = pgTable("curriculum", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 191 }),
  presentationName: varchar("presentationName", { length: 191 }),
  fathersName: varchar("fathersName", { length: 191 }),
  mothersName: varchar("mothersName", { length: 191 }),
  birthday: timestamp("birthday", { mode: "date" }),
  identityDocument: varchar("identityDocument", { length: 80 }),
  CRM: varchar("CRM", { length: 80 }),
  CPF: varchar("CPF", { length: 80 }),
  phone: varchar("phone", { length: 80 }),
  address: varchar("address", { length: 80 }),
  email: varchar("email", { length: 80 }),
  lattes: varchar("lattes", { length: 80 }),
  selfDescription: varchar("selfDescription", { length: 500 }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  initialCourseDate: timestamp("initialCourseDate", {
    mode: "date",
  }),
  finalCourseDate: timestamp("finalCourseDate", { mode: "date" }),
  userId: varchar("userId", { length: 255 })
    .unique()
    .references(() => users.id),
});

export const certifications = pgTable("certification", {
  id: serial("id").primaryKey(),
  fileName: varchar("fileName", { length: 191 }).notNull(),
  key: varchar("key", { length: 191 }).notNull(),
  url: varchar("url", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  curriculumId: integer("curriculumId").references(() => curriculums.id, {
    onDelete: "cascade",
  }),
});

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const roles = pgTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", { enum: ["admin", "user"], length: 50 })
    .notNull()
    .default("user"),
  userId: varchar("userId", { length: 255 }).references(() => users.id),
});

export const rolesRelations = relations(roles, ({ one }) => ({
  user: one(users, {
    fields: [roles.userId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  roles: many(roles),
  curriculums: one(curriculums),
}));

export const curriculumsRelations = relations(curriculums, ({ one, many }) => ({
  user: one(users, {
    fields: [curriculums.userId],
    references: [users.id],
  }),
  certifications: many(certifications),
}));

export const certificatesRelations = relations(certifications, ({ one }) => ({
  curriculum: one(curriculums, {
    fields: [certifications.curriculumId],
    references: [curriculums.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
