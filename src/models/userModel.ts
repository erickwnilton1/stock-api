import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(`error fetching users: ${error}`);

    throw new Error("failed to fetch users");
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.log(`error fetching user ${id}: ${error}`);

    throw new Error("user not found");
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
    console.log(`error creating user: ${error}`);

    throw new Error("failed to create user");
  }
};

export const updateUser = async (
  id: string,
  data: Partial<UserDTO>,
  email: any
) => {
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    console.log(`error updating user: ${id}: ${error}`);

    throw new Error("failed to update user");
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log(`error deleting user: ${id}: ${error}`);

    throw new Error("failed to delete user");
  }
};
