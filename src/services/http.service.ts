import axios, { type AxiosError } from "axios";
import { env } from "@/config/env.config";

export const http = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
);
