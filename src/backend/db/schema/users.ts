import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("STUDENT").notNull(),
  goal: text("goal"),
  isActive: text("is_active").default("true").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = Omit<typeof users.$inferInsert, "id" | "createdAt" | "updatedAt">;

export type UpdateUser = Omit<Partial<InsertUser>, "id" | "createdAt" | "updatedAt">;

