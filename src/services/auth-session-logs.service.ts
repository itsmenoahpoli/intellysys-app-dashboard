import { http } from "@/services/http.service";

export type AuthSessionLogUserRole = {
  id: number;
  name: string;
};

export type AuthSessionLogUser = {
  id: number;
  name: string;
  email: string;
  userRole: AuthSessionLogUserRole;
};

export type AuthSessionLog = {
  id: number;
  userId: number;
  action: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
  user: AuthSessionLogUser;
};

export type AuthSessionLogsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AuthSessionLogsResponse = {
  success: boolean;
  data: AuthSessionLog[];
  meta: AuthSessionLogsMeta;
};

export type AuthSessionLogsQuery = {
  page?: number;
  limit?: number;
  q?: string;
  userId?: number;
  action?: string;
  sortBy?: "createdAt" | "action" | "ipAddress";
  sortOrder?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
};

export async function fetchAuthSessionLogs(query: AuthSessionLogsQuery) {
  const { data } = await http.get<AuthSessionLogsResponse>("/auth-session-logs", {
    params: query,
  });
  return data;
}
