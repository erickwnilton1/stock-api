import { CreateUserDTO } from "../dtos/createUserDTO";
import { userModel } from "../models/userModel";

export const userService = {
  async listUsers() {
    return await userModel.getAll();
  },

  async findUserById(id: string) {
    if (!id) {
      throw new Error("invalid ID");
    }

    const user = await userModel.getById(id);
    return user;
  },

  async createUser(data: CreateUserDTO) {
    if (!data.name || !data.email || !data.password) {
      throw new Error(
        "the items name, email and password are required to create user"
      );
    }

    const user = await userModel.create(data);
    return user;
  },

  async updateUser(id: string, data: Partial<CreateUserDTO>) {
    if (!id) {
      throw new Error("invalid ID");
    }

    if (!data.name && !data.email) {
      throw new Error("the items name and email are required to create user");
    }

    const user = await userModel.update(id, data);
    return user;
  },

  async deleteUser(id: string) {
    if (!id) {
      throw new Error("invalid ID");
    }

    const user = await userModel.delete(id);
    return user;
  },
};
