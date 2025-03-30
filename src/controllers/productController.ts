import { Request, Response } from "express";
import { productService } from "../services/productService";

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await productService.listProducts();

    res.status(200).json(products);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for products" });
    return;
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.findProductById(req.params.id);

    res.status(200).json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product" });
    return;
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, userId, companyId } = req.body;

    const product = await productService.createProduct({
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

    const product = await productService.updateProduct(req.params.id, {
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
  try {
    const product = await productService.deleteProduct(req.params.id);

    res.status(200).json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
    return;
  }
};
