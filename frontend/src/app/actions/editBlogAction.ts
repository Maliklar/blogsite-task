"use server";
import { Blog, EditBlog } from "@/service/@apitypes/BlogType";
import api from "@/service/api";
import { revalidatePath } from "next/cache";

type State = {
  status: boolean;
  message: string;
  errors?: Partial<EditBlog>;
  data?: Blog;
};

export default async function editBlogAction(
  _prevState: unknown,
  formData: FormData
): Promise<State> {
  const errors: Partial<EditBlog> = {};
  const body: EditBlog = {
    id: Number(formData.get("id")) as number,
    title: formData.get("title")?.toString()?.trim() || "",
    content: formData.get("content")?.toString()?.trim() || "",
  };
  if (!body.title) errors.title = "Title is required";
  if (!body.content) errors.content = "Content is required";
  if (body.title?.length && (body.title.length < 10 || body.title.length > 30))
    errors.title = "Title must be between 10 and 30 characters";
  if (body.content && (body.content.length < 30 || body.content.length > 5000))
    errors.content = "Content must be between 30 and 5000 words";

  if (Object.keys(errors).length > 0)
    return {
      status: false,
      message: "Please fill in the required fields: ",
      errors,
    };

  try {
    const { data } = await api.blogs.edit(body);
    revalidatePath("/blogs");
    return { status: true, message: "Blog updated successfully", data };
  } catch {
    return {
      status: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
