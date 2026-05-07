import { http } from "@/services/http.service";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await http.post<unknown>("/api/v1/auth/login", payload);
  return data;
}
