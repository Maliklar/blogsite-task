import { PagedReq, PagedRes } from "../@apitypes/PagedRes";
import { User } from "../@apitypes/UserType";
import serverInstance from "../serverInstance";

const users = {
  async getAll(params?: PagedReq) {
    return serverInstance.get<PagedRes<User[]>>("/api/users", { params });
  },
  async get(id: number) {
    return serverInstance.get<User>(`/api/users/${id}`);
  },
};

export default users;
