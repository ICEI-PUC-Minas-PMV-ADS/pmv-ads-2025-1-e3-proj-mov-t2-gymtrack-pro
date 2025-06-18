import { pgTable, uuid, timestamp, boolean, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { workoutRoutines } from "./workoutRoutines";

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  workoutRoutineId: uuid("workout_routine_id").references(() => workoutRoutines.id),
  date: timestamp("date").defaultNow().notNull(),
  present: boolean("present").default(true).notNull(),
  description: text("description").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = Omit<typeof attendance.$inferInsert, "id" | "createdAt" | "updatedAt">;
export type UpdateAttendance = Partial<InsertAttendance>;
