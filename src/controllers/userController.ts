import { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel";

interface UserDTO {
  name: string;
  email: string;
}

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users || users.length === 0) {
      res.status(400).json({ message: "no users found" });
      return;
    }

    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for users" });
    return;
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const singleUser = await getUserById(req.params.id);

  singleUser
    ? res.json(singleUser)
    : res.status(404).json({ error: "user not found" });
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "the items name, email and password are required to add user",
      });

      return;
    }

    const user = await createUser(name, email, password);

    res.status(201).json(user);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
    return;
  }
};

export const modifyUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const updateData: Partial<UserDTO> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (!name || !email) {
      res.status(400).json({
        message: "the items name and email are required to update user",
      });

      return;
    }

    const user = await updateUser(req.params.id, updateData);

    res.status(200).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
    return;
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const removeCreatedUser = await deleteUser(req.params.id);

  res.status(200).send().json(removeCreatedUser);
  return;
};
