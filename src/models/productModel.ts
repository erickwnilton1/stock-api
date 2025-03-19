import prisma from "../database/prismaClient";
import { CreateProductDTO } from "../dtos/createProductDTO";

export const productModel = {
  async getAll() {
    prisma.product.findMany();
    return;
  },

  async getById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    return product || null;
  },

  async create(data: CreateProductDTO) {
    const product = await prisma.product.create({ data });
    return product || null;
  },

  async update(id: string, data: Partial<CreateProductDTO>) {
    prisma.product.update({ where: { id }, data });
    return;
  },

  async delete(id: string) {
    prisma.product.delete({ where: { id } });
    return;
  },
};
