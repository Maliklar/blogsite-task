"use server";
import { Blog, CreateBlog } from "@/service/@apitypes/BlogType";
import api from "@/service/api";
import { revalidatePath } from "next/cache";

type State = {
  status: boolean;
  message: string;
  errors?: Partial<CreateBlog>;
  data?: Blog;
};

export default async function createBlogAction(
  _prevState: unknown,
  formData: FormData
): Promise<State> {
  const errors: Partial<CreateBlog> = {};
  const body: CreateBlog = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  if (!body.title) errors.title = "Title is required";
  if (!body.content) errors.content = "Content is required";

  if (Object.keys(errors).length > 0)
    return {
      status: false,
      message: "Please fill in the required fields: ",
      errors,
    };

  try {
    const { data } = await api.blogs.create(body);
    revalidatePath("/blogs");
    return { status: true, message: "Blog created successfully", data };
  } catch {
    return {
      status: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
