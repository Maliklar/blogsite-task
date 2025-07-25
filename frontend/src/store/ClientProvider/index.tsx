"use client";

import { User } from "@/service/@apitypes/UserType";
import { useEffect } from "react";
import { useAuth } from "../AuthStoreProvider";

export default function ClientProvider({ user }: { user: User | null }) {
  const { setUser } = useAuth();
  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return null;
}
