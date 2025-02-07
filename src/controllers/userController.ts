import { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel";

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "no users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "error when searching for users" });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const singleUser = await getUserById(req.params.id);

  singleUser
    ? res.json(singleUser)
    : res.status(404).json({ error: "user not found" });
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await createUser(name, email, password);

  return res.status(201).json(user);
};

export const modifyUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await updateUser(req.params.id, name, email);

  return res.status(200).json(user);
};

export const removeUser = async (req: Request, res: Response) => {
  const removeCreatedUser = await deleteUser(req.params.id);

  return res.status(200).send().json(removeCreatedUser);
};
