"use client";

import React, { useState } from "react";
import { Field, inputCls } from "@repo/ui/field";
import type { NewCompany } from "@acme/models";

// Props opcionales: permitir manejar el submit desde afuera
type Props = {
  onSubmit?: (data: NewCompany) => Promise<void> | void;
  isSubmitting?: boolean;
};

// Utilidades simples de validación
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta 11 dígitos con o sin guiones (ej: 20-12345678-3 o 20123456783)
const cuitRegex = /^(\d{2}-?\d{8}-?\d)$/;

export default function RegisterPage({ onSubmit, isSubmitting }: Props) {
  const [values, setValues] = useState<NewCompany>({
    name: "",
    cuit: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewCompany, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const busy = isSubmitting ?? submitting;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Limpia error al modificar
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = (data: NewCompany) => {
    const next: Partial<Record<keyof NewCompany, string>> = {};

    if (!data.name?.trim()) next.name = "Obligatorio";

    const cuit = (data.cuit ?? "").replaceAll(" ", "");
    if (!cuit) next.cuit = "Obligatorio";
    else if (!cuitRegex.test(cuit)) next.cuit = "Formato inválido";

    if (!data.email?.trim()) next.email = "Obligatorio";
    else if (!emailRegex.test(data.email)) next.email = "Email inválido";

    if (!data.password) next.password = "Obligatorio";
    else if (data.password.length < 8) next.password = "Mínimo 8 caracteres";

    if (data.phone && data.phone.length < 6) next.phone = "Demasiado corto";

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      if (onSubmit) await onSubmit(values);
      else {
        const res = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          let message = "Error al registrar la empresa";
          try {
            const data = await res.json();
            if (data?.error && typeof data.error === "string") {
              message = data.error;
            }
          } catch {
            // ignorar error al parsear
          }
          alert(message);
          return;
        }

        alert("Empresa registrada correctamente");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Crear cuenta</h1>
        <p className="mt-1 text-sm text-gray-500">Completá los datos de tu empresa</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <Field label="Nombre de la empresa" htmlFor="name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              className={inputCls(errors.name)}
              placeholder="Tyto Alba S.R.L."
              value={values.name ?? ""}
              onChange={handleChange}
              autoComplete="organization"
            />
          </Field>

          <Field label="CUIT" htmlFor="cuit" error={errors.cuit} hint="Ej: 20-12345678-3">
            <input
              id="cuit"
              name="cuit"
              type="text"
              className={inputCls(errors.cuit)}
              placeholder="20-12345678-3"
              value={values.cuit ?? ""}
              onChange={handleChange}
              autoComplete="off"
              inputMode="numeric"
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              className={inputCls(errors.email)}
              placeholder="admin@empresa.com"
              value={values.email ?? ""}
              onChange={handleChange}
              autoComplete="email"
            />
          </Field>

          <Field label="Contraseña" htmlFor="password" error={errors.password}>
            <input
              id="password"
              name="password"
              type="password"
              className={inputCls(errors.password)}
              placeholder="********"
              value={values.password ?? ""}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
            />
          </Field>

          <Field label="Teléfono (opcional)" htmlFor="phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputCls(errors.phone)}
              placeholder="11 1234-5678"
              value={values.phone ?? ""}
              onChange={handleChange}
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>

          <Field label="Dirección (opcional)" htmlFor="address">
            <input
              id="address"
              name="address"
              type="text"
              className={inputCls()}
              placeholder="Av. Siempre Viva 742"
              value={values.address ?? ""}
              onChange={handleChange}
              autoComplete="street-address"
            />
          </Field>

          <button
            type="submit"
            disabled={busy}
            className="w-full h-11 rounded-xl border border-gray-900 bg-gray-900 font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Registrando…" : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}
