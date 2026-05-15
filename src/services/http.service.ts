import axios, { type AxiosError } from "axios";
import { env } from "@/config/env.config";
import { useAuthStore } from "@/stores/auth.store";

export const http = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().loginResponse?.token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    if (status === 401) {
      // Token invalid/expired: clear auth and let the app route-guard redirect.
      useAuthStore.getState().clearAuth()
      if (typeof window !== 'undefined' && window.location.pathname !== '/signin') {
        window.location.assign('/signin')
      }
    }
    return Promise.reject(error)
  },
);
