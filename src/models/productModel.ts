import prisma from "../database/prismaClient";
import { CreateProductDTO } from "../dtos/createProductDTO";

export const productModel = {
  async getAll() {
    const products = await prisma.product.findMany();
    return products;
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
    return await prisma.product.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.product.delete({ where: { id } });
  },
};
