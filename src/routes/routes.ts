import { Router } from "express";
import { userRouter } from "./user.routes";
import { companyRouter } from "./company.routes";

export const router = Router();

router.use(userRouter);
router.use(companyRouter);

export default router;
