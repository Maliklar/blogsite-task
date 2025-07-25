import { Blog } from "./BlogType";

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  blogs?: Blog[];

  createdAt: string;
  updatedAt: string;
};

export type DetailedUser = User & {
  blogs: Blog[];
};
