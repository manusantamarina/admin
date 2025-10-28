import type { Company, NewCompany } from "@acme/models";

export interface CompanyService {
  createCompany(input: NewCompany): Promise<Company>;
  getCompanyByEmail(mail: string): Promise<Company | null>;
}
