import {
  Blog,
  CreateBlog,
  DetailedBlog,
  EditBlog,
} from "../@apitypes/BlogType";
import { PagedReq, PagedRes } from "../@apitypes/PagedRes";
import serverInstance from "../serverInstance";

const blogs = {
  async getAll(params?: PagedReq) {
    return serverInstance.get<PagedRes<DetailedBlog[]>>("/api/blogs", {
      params,
    });
  },
  async get(id: number) {
    return serverInstance.get<Blog>(`/api/blogs/${id}`);
  },
  async getMy() {
    return serverInstance.get<DetailedBlog[]>("/api/blogs/user/get");
  },

  async create(body: CreateBlog) {
    return serverInstance.post<Blog>("/api/blogs", body);
  },
  async edit(body: EditBlog) {
    return serverInstance.put<Blog>(`/api/blogs`, body);
  },
  async delete(id: number) {
    return serverInstance.delete<Blog>(`/api/blogs/${id}`);
  },
};
export default blogs;
