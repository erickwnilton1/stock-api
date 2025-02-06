import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";

interface User {
  name: string;
  email: string;
  password: string;
}

export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.log(`Error fetching user ${id}: ${error}`);
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (error) {
    console.log(`Error creating user: ${error}`);
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    console.log(`Error updating user: ${id}: ${error}`);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log(`Error deleting user: ${id}: ${error}`);
  }
};
