"use server";
import api from "@/service/api";
import { LoginRequest } from "@/service/@apitypes/AuthType";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

export default async function loginAction(formData: FormData) {
  const body: LoginRequest = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "Email required";
    if (!password) errors.password = "Email required";
    const errorString = Object.entries(errors)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    redirect(`/login?${errorString}`);
  }

  try {
    const { data } = await api.auth.login(body);
    const accessToken = data.accessToken;
    const cookie = await cookies();
    cookie.set("token", accessToken);
    redirect("/");
  } catch (error) {
    if (error instanceof AxiosError && error.status && +error.status === 401)
      redirect(`/login?message=${encodeURIComponent("Invalid credentials")}`);
    redirect(
      `/login?message=${encodeURIComponent(
        "Something went wrong, please try again later"
      )}`
    );
  }
}
