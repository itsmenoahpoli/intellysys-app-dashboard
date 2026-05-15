import { http } from "@/services/http.service";
import { type LoginResponse, useAuthStore } from "@/stores/auth.store";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await http.post<LoginResponse>("/auth/login", payload);
  useAuthStore.getState().setLoginResponse(data);
  return data;
}

export async function logout() {
  try {
    await http.post("/auth/logout");
  } catch {
    // best-effort: still clear local auth if the request fails
  } finally {
    useAuthStore.getState().clearAuth();
  }
}
