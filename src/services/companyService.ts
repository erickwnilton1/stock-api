import { CreateCompanyDTO } from "../dtos/createCompanyDTO";
import { companyModel } from "../models/companyModel";

export const companyService = {
  async listCompanys() {
    return await companyModel.getAll();
  },

  async findCompanyById(id: string) {
    if (!id) {
      throw new Error("invalid ID");
    }

    const company = await companyModel.getById(id);
    return company;
  },

  async createCompany(data: CreateCompanyDTO) {
    if (!data.name || !data.email || !data.password) {
      throw new Error(
        "the items name, email and password are required to create company"
      );
    }

    const company = await companyModel.create(data);
    return company;
  },

  async updateCompany(id: string, data: Partial<CreateCompanyDTO>) {
    if (!id) {
      throw new Error("invalid ID");
    }

    if (!data.name && !data.email) {
      throw new Error(
        "the items name and email are required to create company"
      );
    }

    const company = await companyModel.update(id, data);
    return company;
  },

  async deleteCompany(id: string) {
    if (!id) {
      throw new Error("invalid ID");
    }

    const company = await companyModel.delete(id);
    return company;
  },
};
