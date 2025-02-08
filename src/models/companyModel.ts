import prisma from "../database/prismaClient";

export const getCompanys = async () => {
  try {
    return await prisma.company.findMany();
  } catch (error) {
    console.log(`error fetching companys: ${error}`);

    throw new Error("failed to fetch companys");
  }
};

export const getCompanyById = async (id: string) => {
  try {
    return await prisma.company.findUnique({ where: { id } });
  } catch (error) {
    console.log(`error fetching company ${id}: ${error}`);

    throw new Error("company not found");
  }
};

export const createCompany = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    return await prisma.company.create({ data: { name, email, password } });
  } catch (error) {
    console.log(`error creating company: ${error}`);

    throw new Error("failed to create company");
  }
};

export const updateCompany = async (
  id: string,
  name: string,
  email: string
) => {
  try {
    return await prisma.company.update({
      where: { id },
      data: { name, email },
    });
  } catch (error) {
    console.log(`error updating company: ${id}: ${error}`);

    throw new Error("failed to update company");
  }
};

export const deleteCompany = async (id: string) => {
  try {
    return await prisma.company.delete({ where: { id } });
  } catch (error) {
    console.log(`error deleting company: ${id}: ${error}`);

    throw new Error("failed to delete company");
  }
};
