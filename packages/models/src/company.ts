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

export interface NewCompany {
  name: string;
  cuit: string;
  email: string;
  password: string; 
  phone?: string;
  address?: string;
}
