import { http } from "@/services/http.service";
import {
  type LoginResponse,
  useAuthStore,
} from "@/stores/auth.store";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await http.post<LoginResponse>(
    "/api/v1/auth/login",
    payload,
  );
  useAuthStore.getState().setLoginResponse(data);
  return data;
}

export function logout() {
  useAuthStore.getState().clearAuth();
}
