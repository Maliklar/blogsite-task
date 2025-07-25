import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../@apitypes/AuthType";
import serverInstance from "../serverInstance";

const auth = {
  async login(body: LoginRequest) {
    return serverInstance.post<LoginResponse>("/api/auth/login", body);
  },
  async register(body: RegisterRequest) {
    return serverInstance.post<RegisterResponse>("/api/auth/register", body);
  },
};
export default auth;
