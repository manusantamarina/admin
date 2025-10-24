import type { CompanyService } from "@acme/interfaces";
import { insertCompany, getCompanyByEmail } from "@acme/persistence";

export const companyService: CompanyService = {
  async createCompany(input) {
    return insertCompany(input);
  },

  async getCompanyByEmail(email){
    return getCompanyByEmail(email);
  }
};

export const createCompany = companyService.createCompany;
