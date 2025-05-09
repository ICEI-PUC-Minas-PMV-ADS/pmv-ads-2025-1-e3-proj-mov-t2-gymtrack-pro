import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { userRoleEnum } from "./schema/enums";
import { users } from "./schema/users";

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

const client =
  globalForDb.client ?? postgres(process.env.DATABASE_URL ?? "MISSING_DATABASE_URL", { prepare: false });

if (process.env.NODE_ENV === "development") globalForDb.client = client;

export const db = drizzle({
  client,
  schema: {
    userRoleEnum: userRoleEnum,
    users: users,
  },
});
