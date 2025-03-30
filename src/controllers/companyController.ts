import { Request, Response } from "express";
import { companyService } from "../services/companyService";

export const getAllCompanys = async (_: Request, res: Response) => {
  try {
    const companys = await companyService.listCompanys();

    res.status(200).json(companys);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for companys" });
    return;
  }
};

export const getSingleCompany = async (req: Request, res: Response) => {
  try {
    const singleCompany = await companyService.findCompanyById(req.params.id);

    res.status(200).json(singleCompany);
    return;
  } catch (error) {
    res.status(500).json({ message: "error recovering company" });
    return;
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const company = await companyService.createCompany({
      name,
      email,
      password,
    });

    res.status(201).json(company.name);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create company" });
    return;
  }
};

export const modifyCompany = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const company = await companyService.updateCompany(req.params.id, {
    name,
    email,
  });

  res.status(200).json(company);
  return;
};

export const removeCompany = async (req: Request, res: Response) => {
  try {
    const removeCreatedCompany = await companyService.deleteCompany(
      req.params.id
    );

    res.status(200).json({ message: "company removed" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company" });
    return;
  }
};
