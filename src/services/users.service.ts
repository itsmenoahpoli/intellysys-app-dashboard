import { http } from "@/services/http.service";

export type UserRole = {
  id: number;
  name: string;
};

export type UserListItem = {
  id: number;
  name: string;
  username: string;
  email: string;
  userRoleId: number;
  userRole: UserRole;
  department: string;
  status: "Active" | "Inactive";
  lastLoginAt: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type UsersStatsResponse = {
  success: boolean;
  cards: {
    totalUsers: number;
    activeUsers: number;
    superAdmins: number;
    itAdmins: number;
    managers: number;
    employees: number;
  };
  roleDistribution: Array<{ id: number; name: string; count: number }>;
};

export type UsersQuery = Partial<{
  page: number;
  limit: number;
  q: string;
  roleId: number | "all";
  status: "all" | "active" | "inactive";
  department: string | "all";
  sortBy: "name" | "email" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
}>;

export async function fetchUsers(query: UsersQuery) {
  const { data } = await http.get<PaginatedResponse<UserListItem>>("/users", {
    params: query,
  });
  return data;
}

export async function fetchUsersStats() {
  const { data } = await http.get<UsersStatsResponse>("/users/stats");
  return data;
}

export async function fetchUserRoles() {
  const { data } = await http.get<{ success: boolean; data: UserRole[] }>(
    "/user-roles",
  );
  return data;
}

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  userRoleId: number;
};

export type UpdateUserPayload = Partial<{
  name: string;
  email: string;
  password: string;
  userRoleId: number;
}>;

export async function createUser(payload: CreateUserPayload) {
  const { data } = await http.post<{ success: boolean; data: UserListItem }>(
    "/users",
    payload,
  );
  return data;
}

export async function updateUser(id: number, payload: UpdateUserPayload) {
  const { data } = await http.patch<{ success: boolean; data: UserListItem }>(
    `/users/${id}`,
    payload,
  );
  return data;
}

export async function deleteUser(id: number) {
  await http.delete(`/users/${id}`);
  return { success: true };
}

