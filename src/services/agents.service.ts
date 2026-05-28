import { http } from "@/services/http.service";
import type { PaginatedResponse } from "./users.service";

export type AgentItem = {
  id: number;
  uuid: string;
  identifier: string;
  name: string | null;
  platform: string | null;
  arch: string | null;
  appVersion: string | null;
  status: "online" | "offline";
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
  licenseKey: {
    id: number;
    code: string;
    status: "unused" | "used" | "revoked";
  };
};

export type AgentsQuery = Partial<{
  page: number;
  limit: number;
  q: string;
  status: "all" | "online" | "offline";
  sortBy: "name" | "status" | "lastSeenAt" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
}>;

export async function fetchAgents(query: AgentsQuery) {
  const { data } = await http.get<PaginatedResponse<AgentItem>>("/agents", {
    params: query,
  });
  return data;
}
