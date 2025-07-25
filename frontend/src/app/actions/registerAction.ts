"use server";

import api from "@/service/api";
import validateEmail from "@/utils/validateEmail";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

type FieldsErrors = {
  firstName?: string;
  email?: string;
  password?: string;
};

export default async function registerAction(formData: FormData) {
  const firstName = formData.get("firstName")?.toString()?.trim() || "";
  const lastName = formData.get("lastName")?.toString()?.trim() || "";
  const email = formData.get("email")?.toString()?.trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (
    !firstName ||
    !email ||
    !password ||
    (password && password?.toString().length < 8)
  ) {
    const errors: FieldsErrors = {};
    if (!firstName) errors.firstName = "Required Field";
    if (!validateEmail(email)) errors.email = "Please enter a valid email";
    if (!email) errors.email = "Required Field";
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters in length";
    if (!password) errors.password = "Required Field";

    const errorString = Object.entries(errors)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    redirect(`/register?${errorString}`, RedirectType.replace);
  }

  try {
    const { data } = await api.auth.register({
      firstName: firstName?.toString(),
      lastName: lastName?.toString(),
      email: email?.toString(),
      password: password?.toString(),
    });

    const cookie = await cookies();
    cookie.set("token", data.accessToken);
    revalidatePath("/", "page");
    redirect("/");
  } catch (error) {
    if (error instanceof AxiosError && error.status && +error.status === 401)
      redirect(
        `/register?message=${encodeURIComponent("Invalid credentials")}`
      );

    redirect(
      `/register?message=${encodeURIComponent(
        "Something went wrong, please try again later"
      )}`
    );
  }
}
