import type { CompanyService } from "@acme/interfaces";
import { insertCompany, getCompanyByEmail } from "@acme/persistence";
import bcrypt from "bcryptjs";

export const companyService: CompanyService = {
  async createCompany(input) {
    const hash = await hashPassword(input.password);
    input.password = hash;
    return insertCompany(input);
  },

  async getCompanyByEmail(email){
    return getCompanyByEmail(email);
  }
};

async function hashPassword(pass:string): Promise<string>{
  const ROUNDS = 12;
  return bcrypt.hash(pass, ROUNDS);
}

export const createCompany = companyService.createCompany;
