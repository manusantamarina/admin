import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Datos de la empresa
  name: text("name").notNull(),
  cuit: text("cuit").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),

  // Autenticación
  passwordHash: text("password_hash").notNull(),

  // Auditoría
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
