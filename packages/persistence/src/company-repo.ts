import { db } from "./db";
import { companies } from "./schema";
import { eq } from "drizzle-orm";
import type { Company, LoginComapny, NewCompany } from "@acme/models";

/**
 * Inserta una compañía en la base de datos.
 * Recibe un NewCompany con la contraseña ya hasheada (passwordHash).
 */
export async function insertCompany(input: NewCompany): Promise<Company> {
  try {
    const [row] = await db
      .insert(companies)
      .values({
        name: input.name,
        cuit: input.cuit,
        email: input.email,
        phone: input.phone,
        address: input.address,
        passwordHash: input.password, // ya viene hasheada desde el service
      })
      .returning();

    if (!row) {
      throw new Error("No se pudo crear la compañía");
    }

    return {
      id: row.id,
      name: row.name,
      cuit: row.cuit,
      email: row.email,
      ...(row.phone == null ? {} : { phone: row.phone }),
      ...(row.address == null ? {} : { address: row.address }),
      createdAt: row.createdAt!,
      updatedAt: row.updatedAt!,
    };
  } catch (err: any) {
    if (err?.code === "23505") {
      throw new Error("El email ya está registrado");
    }
    throw err;
  }
}

/**
 * Obtiene una compañía por email, usada para verificar login o unicidad.
 */
export async function getCompanyByEmail(email: string): Promise<Company | null> {
  const row = await db.query.companies.findFirst({
    where: eq(companies.email, email),
  });

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    cuit: row.cuit,
    email: row.email,
    ...(row.phone == null ? {} : { phone: row.phone }),
    ...(row.address == null ? {} : { address: row.address }),
    createdAt: row.createdAt!,
    updatedAt: row.updatedAt!,
  };
}

export async function getLoginCompany(email: string): Promise<LoginComapny | null>{
  const row = await db.query.companies.findFirst({
    where: eq(companies.email, email),
  });

  if (!row) return null;

  return {
    email: row.email,
    password: row.passwordHash
  };
}