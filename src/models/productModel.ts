import prisma from "../database/prismaClient";

interface ProductDTO {
  name: string;
  description: string;
  price: number;
  quantity: number;
  userId?: string;
  companyId?: string;
}

export const getProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.log(`error fetching products: ${error}`);

    throw new Error("failed to fetch products");
  }
};

export const getProductsById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      console.log(`product with ID ${id} not found`);
    }

    return product;
  } catch (error) {
    console.log(`error fetching product ${id}: ${error}`);

    throw new Error("product not found");
  }
};

export const createProduct = async (data: ProductDTO) => {
  try {
    return await prisma.product.create({ data });
  } catch (error) {
    console.log(`error creating product: ${error}`);

    throw new Error("failed to create product");
  }
};

export const updateProduct = async (id: string, data: Partial<ProductDTO>) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      console.log(`product with ID ${id} not found`);
    }

    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error updating product ${id}: ${error}`);

    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      console.log(`product with ID ${id} not found`);
    }

    return await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.log(`error deleting product: ${id}: ${error}`);

    throw new Error("failed to delete product");
  }
};
