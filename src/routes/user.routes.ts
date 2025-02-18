import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  modifyUser,
  removeUser,
} from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getSingleUser);
userRouter.post("/user", addUser);
userRouter.put("/user/:id", modifyUser);
userRouter.delete("/user/:id", removeUser);
