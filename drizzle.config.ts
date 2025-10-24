// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./packages/persistence/src/schema.ts",
  out: "./packages/persistence/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ej: postgresql://user:pass@localhost:5432/db
  },
});
