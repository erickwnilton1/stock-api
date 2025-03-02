import { Request, Response } from "express";
import {
  getCompanys,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../models/companyModel";

export const getAllCompanys = async (_: Request, res: Response) => {
  try {
    const companys = await getCompanys();

    if (!companys || companys.length === 0) {
      res.status(400).json({ message: "no companys found" });
      return;
    }

    res.status(200).json(companys);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for companys" });
    return;
  }
};

export const getSingleCompany = async (req: Request, res: Response) => {
  const singleCompany = await getCompanyById(req.params.id);

  singleCompany
    ? res.json(singleCompany)
    : res.status(404).json({ error: "company not found" });
};

export const addCompany = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const company = await createCompany(name, email, password);

  res.status(201).json(company.name);
  return;
};

export const modifyCompany = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const company = await updateCompany(req.params.id, name, email);

  res.status(200).json(company);
  return;
};

export const removeCompany = async (req: Request, res: Response) => {
  const removeCreatedCompany = await deleteCompany(req.params.id);

  res.status(200).send().json(removeCreatedCompany.name);
  return;
};
