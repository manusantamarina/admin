import type { Company, LoginComapny, NewCompany } from "@acme/models";

export interface CompanyService {
  createCompany(input: NewCompany): Promise<Company>;
  getCompanyByEmail(email: string): Promise<Company | null>;
  getLoginCompany(email: string): Promise<LoginComapny | null>;
  validateCompany(input: LoginComapny): Promise<boolean>;
}
