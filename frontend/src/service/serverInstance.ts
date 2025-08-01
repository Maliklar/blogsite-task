import axios from "axios";
import { cookies } from "next/headers";

const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverInstance.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default serverInstance;
