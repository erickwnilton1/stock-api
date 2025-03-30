import { Request, Response } from "express";
import { userService } from "../services/userService";
import { CreateUserDTO } from "../dtos/createUserDTO";

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.listUsers();

    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "error when searching for users" });
    return;
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const singleUser = await userService.findUserById(req.params.id);

    res.status(200).json(singleUser);
    return;
  } catch (error) {
    res.status(500).json({ message: "error recovering user" });
    return;
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.createUser({ name, email, password });

    res.status(201).json(user);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    return;
  }
};

export const modifyUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await userService.updateUser(req.params.id, { name, email });

  res.status(200).json(user);
  return;
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const removeCreatedUser = await userService.deleteUser(req.params.id);

    res.status(200).json({ message: "user removed" });
    return;
  } catch (error) {
    res.status(500).json({ message: "failed to delete user" });
  }
};
