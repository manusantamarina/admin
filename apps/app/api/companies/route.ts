import { NextResponse, type NextRequest } from "next/server";
import type { NewCompany } from "@acme/models";
import { companyService } from "@acme/services";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<NewCompany>;

    if (!body.name || !body.cuit || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    const company = await companyService.createCompany(body as NewCompany);

    return NextResponse.json(company, { status: 201 });
  } catch (err: any) {
    const message = err?.message ?? "Error al crear la compañía";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

