import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  modifyProduct,
  removeProduct,
} from "../controllers/productController";

export const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getSingleProduct);
productRouter.post("/product", addProduct);
productRouter.put("/product/:id", modifyProduct);
productRouter.delete("/product/:id", removeProduct);
