import type { Company, NewCompany } from "@acme/models";

/**
 * Contrato que utiliza la UI para interactuar con el dominio de compañías.
 */
export interface CompanyService {
  createCompany(input: NewCompany): Promise<Company>;
  getCompanyByEmail(mail: string): Promise<Company | null>;
}
