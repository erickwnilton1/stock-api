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
      return res.status(400).json({ message: "no products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "error when searching for companys" });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const singleProduct = await getProductsById(req.params.id);

  singleProduct
    ? res.json(singleProduct)
    : res.status(400).json({ message: "product not found" });
};

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, quantity } = req.body;

  const product = await createProduct(name, description, price, quantity);

  return res.status(201).json(product);
};

export const modifyProduct = async (req: Request, res: Response) => {
  const { name, description, price, quantity } = req.body;

  const product = await updateProduct(
    req.params.id,
    name,
    description,
    price,
    quantity
  );

  return res.status(200).json(product);
};

export const removeProduct = async (req: Request, res: Response) => {
  const removeCreatedProduct = await deleteProduct(req.params.id);

  return res.status(200).json(removeCreatedProduct.name);
};
