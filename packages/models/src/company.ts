/** Datos que una empresa puede tener en la DB */
export interface Company {
  id: string;
  name: string;
  cuit: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Datos requeridos para crear una empresa desde el front */
export interface NewCompany {
  name: string;
  cuit: string;
  email: string;
  password: string; // el front manda la password en texto
  phone?: string;
  address?: string;
}
