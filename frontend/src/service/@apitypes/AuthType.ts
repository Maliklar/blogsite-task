import { User } from "./UserType";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type RegisterRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  accessToken: string;
  user: User;
};
