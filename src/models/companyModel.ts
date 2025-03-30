import bcrypt from "bcrypt";
import prisma from "../database/prismaClient";
import { CreateCompanyDTO } from "../dtos/createCompanyDTO";

export const companyModel = {
  async getAll() {
    const companys = await prisma.company.findMany();
    return companys;
  },

  async getById(id: string) {
    const company = await prisma.company.findUnique({ where: { id } });
    return company || null;
  },

  async create(data: CreateCompanyDTO) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const company = await prisma.company.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

      return company || null;
    } catch (error) {
      throw new Error("failed to create company");
    }
  },

  async update(id: string, data: Partial<CreateCompanyDTO>) {
    await prisma.company.update({ where: { id }, data });
    return;
  },

  async delete(id: string) {
    await prisma.company.delete({ where: { id } });
    return;
  },
};
