import { http } from "@/services/http.service";

export type MyAccountProfile = {
  id: number;
  name: string;
  email: string;
  userRoleId: number;
  userRole: { id: number; name: string };
  createdAt: string;
  updatedAt: string;
};

export type UpdateMyAccountPayload = {
  name?: string;
  email?: string;
};

export type UpdateMyPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function fetchMyAccount() {
  const { data } = await http.get<{ success: boolean; data: MyAccountProfile }>(
    "/account/me",
  );
  return data;
}

export async function updateMyAccount(payload: UpdateMyAccountPayload) {
  const { data } = await http.patch<{ success: boolean; data: MyAccountProfile }>(
    "/account/me",
    payload,
  );
  return data;
}

export async function updateMyPassword(payload: UpdateMyPasswordPayload) {
  const { data } = await http.patch<{ success: boolean; message?: string }>(
    "/account/password",
    payload,
  );
  return data;
}
