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

export default async function deleteBlogAction(
  _prevState: unknown,
  formData: FormData
): Promise<State> {
  const id = Number(formData.get("id"));

  try {
    const { data } = await api.blogs.delete(id);
    return { status: true, message: "Blog Deleted successfully", data };
  } catch {
    return {
      status: false,
      message: "Something went wrong, please try again later.",
    };
  }
}
