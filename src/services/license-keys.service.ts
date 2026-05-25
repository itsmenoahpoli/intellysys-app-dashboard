import { http } from "@/services/http.service";
import type { PaginatedResponse } from "./users.service";

export type LicenseKeyItem = {
  id: number;
  uuid: string;
  code: string;
  status: "unused" | "used" | "revoked";
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type LicenseKeysStatsResponse = {
  success: boolean;
  total: number;
  unused: number;
  used: number;
  revoked: number;
};

export type LicenseKeysQuery = Partial<{
  page: number;
  limit: number;
  q: string;
  status: "all" | "unused" | "used" | "revoked";
  sortBy: "code" | "status" | "expiresAt" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
}>;

export async function fetchLicenseKeys(query: LicenseKeysQuery) {
  const { data } = await http.get<PaginatedResponse<LicenseKeyItem>>("/license-keys", {
    params: query,
  });
  return data;
}

export async function fetchLicenseKeysStats() {
  const { data } = await http.get<LicenseKeysStatsResponse>("/license-keys/stats");
  return data;
}

export type CreateLicenseKeyPayload = {
  code?: string;
  expiresAt: string;
};

export type UpdateLicenseKeyPayload = Partial<{
  code: string;
  status: "unused" | "used" | "revoked";
  expiresAt: string;
}>;

export async function createLicenseKey(payload: CreateLicenseKeyPayload) {
  const { data } = await http.post<{ success: boolean; data: LicenseKeyItem }>(
    "/license-keys",
    payload,
  );
  return data;
}

export async function updateLicenseKey(id: number, payload: UpdateLicenseKeyPayload) {
  const { data } = await http.patch<{ success: boolean; data: LicenseKeyItem }>(
    `/license-keys/${id}`,
    payload,
  );
  return data;
}

export async function deleteLicenseKey(id: number) {
  await http.delete(`/license-keys/${id}`);
  return { success: true };
}
