import { User } from "@/service/@apitypes/UserType";
import { create } from "zustand";

export type AuthStoreProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const createAuthStore = ({ user }: { user: User | null }) => {
  return create<AuthStoreProps>((set) => ({
    user,
    setUser: (user) => set({ user }),
  }));
};
