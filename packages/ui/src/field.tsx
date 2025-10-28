import * as React from "react";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {hint && !error ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

// Utilidad sencilla para inputs con estado de error
export function inputCls(hasError?: string) {
  return [
    "w-full h-11 rounded-xl border px-3 outline-none bg-white text-gray-900 placeholder:text-gray-400",
    "focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900",
    hasError ? "border-red-500" : "border-gray-300",
  ].join(" ");
}
