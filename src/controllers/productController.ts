import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../models/productModel";

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await getProducts();

    if (!products || products.length === 0) {
      res.status(400).json({ message: "no products found" });
      return;
    }

    res.status(200).json(products);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for companys" });
    return;
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const singleProduct = await getProductsById(req.params.id);

  singleProduct
    ? res.json(singleProduct)
    : res.status(400).json({ message: "product not found" });
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, userId, companyId } = req.body;

    if (!name || !price || !quantity) {
      res.status(400).json({
        message:
          "the items name, price and quantity are required to add a product",
      });

      return;
    }

    const product = await createProduct({
      name,
      description,
      price,
      quantity,
      userId,
      companyId,
    });

    res.status(201).json(product);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
    return;
  }
};

export const modifyProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      res.status(400).json({
        message:
          "the items name, price and quantity are required to update a product",
      });

      return;
    }

    const product = await updateProduct(req.params.id, {
      name,
      description,
      price,
      quantity,
    });

    res.status(200).json(product);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to updated product" });
    return;
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const removeCreatedProduct = await deleteProduct(req.params.id);

  res.status(200).json(removeCreatedProduct.name);
  return;
};
