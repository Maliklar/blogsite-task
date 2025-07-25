import { User } from "./UserType";

export type Blog = {
  id: number | string;
  title: string;
  content: string;
  userId: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
};

export type CreateBlog = Omit<
  Blog,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
export type EditBlog = Omit<Blog, "userId" | "createdAt" | "updatedAt">;
export type DetailedBlog = Blog & {
  user: User;
};
