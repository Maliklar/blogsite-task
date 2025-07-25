import { User } from "../@apitypes/UserType";
import serverInstance from "../serverInstance";

const users = {
  async getAll() {
    return serverInstance.get<User[]>("/api/users");
  },
  async get(id: number) {
    return serverInstance.get<User>(`/api/users/${id}`);
  },
};

export default users;
