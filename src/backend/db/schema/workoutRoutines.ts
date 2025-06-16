import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const workoutRoutines = pgTable("workout_routines", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description").default("").notNull(),
  exercises: text("exercises").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WorkoutRoutine = typeof workoutRoutines.$inferSelect;
export type InsertWorkoutRoutine = Omit<typeof workoutRoutines.$inferInsert, "id" | "createdAt" | "updatedAt">;
export type UpdateWorkoutRoutine = Partial<InsertWorkoutRoutine>;
