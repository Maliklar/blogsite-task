"use server";
import { User } from "@/service/@apitypes/UserType";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) return null;
  try {
    const user = jwtDecode(token.value) as User;
    return user;
  } catch {
    return null;
  }
}
