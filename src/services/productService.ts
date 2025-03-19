import { CreateProductDTO } from "../dtos/createProductDTO";
import { productModel } from "../models/productModel";

export const productService = {
  async listProducts() {
    productModel.getAll();
    return;
  },

  async findProductById(id: string) {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const product = await productModel.getById(id);
    return product;
  },

  async createProduct(data: CreateProductDTO) {
    if (!data.name || !data.price || !data.quantity) {
      throw new Error(
        "the items name, price and quantity are required to create product"
      );
    }

    if (data.price < 0 || data.quantity < 0) {
      throw new Error("only positive values ​are accepted");
    }

    const product = await productModel.create(data);
    return product;
  },

  async updateProduct(id: string, data: CreateProductDTO) {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const product = await productModel.update(id, data);
    return product;
  },

  async deleteProduct(id: string) {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const product = await productModel.delete(id);
    return product;
  },
};
