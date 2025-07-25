"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { useStore } from "zustand";
import { AuthStoreProps, createAuthStore } from "../useAuth";
import { User } from "@/service/@apitypes/UserType";
import ClientProvider from "../ClientProvider";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export interface AuthStoreProviderProps {
  children: ReactNode;
  user: User | null;
}

export const AuthStoreProvider = ({
  children,
  user,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAuthStore({ user });
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      <ClientProvider user={user} />
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuth = (): AuthStoreProps => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuth must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, (s) => s);
};
