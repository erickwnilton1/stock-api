import { Router } from "express";
import {
  addCompany,
  getAllCompanys,
  getSingleCompany,
  modifyCompany,
  removeCompany,
} from "../controllers/companyController";

export const companyRouter = Router();

companyRouter.get("/companys", getAllCompanys);
companyRouter.get("/company/:id", getSingleCompany);
companyRouter.post("/company", addCompany);
companyRouter.put("/company/:id", modifyCompany);
companyRouter.delete("/company/:id", removeCompany);
