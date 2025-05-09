import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema/",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "MISSING_DATABASE_URL",
  },
});
