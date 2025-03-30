import bcrypt from "bcrypt";
import prisma from "../database/prismaClient";
import { CreateUserDTO } from "../dtos/createUserDTO";

export const userModel = {
  async getAll() {
    const users = await prisma.user.findMany({ include: { products: true } });
    return users;
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user || null;
  },

  async create(data: CreateUserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

      return user || null;
    } catch (error) {
      throw new Error("failed to create user");
    }
  },

  async update(id: string, data: Partial<CreateUserDTO>) {
    await prisma.user.update({ where: { id }, data });
    return;
  },

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
    return;
  },
};
