import { Router } from "express";
import { userRouter } from "./user.routes";
import { companyRouter } from "./company.routes";
import { productRouter } from "./products.routes";

export const router = Router();

router.use(userRouter);
router.use(companyRouter);
router.use(productRouter);

export default router;
