import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import {
  AuthSessionLogsModal,
  ConfirmDialog,
  RecentActivityCard,
  RoleDistributionCard,
  UserModal,
  UsersHeader,
  UsersSummaryGrid,
  UsersTablePanel,
  UserStatusSecurityCard,
  extractErrorMessage,
  roleStyle,
  titleCase,
  toPct,
} from "@/components/modules/users-management";
import {
  createUser,
  deleteUser,
  fetchUserRoles,
  fetchUsers,
  fetchUsersStats,
  updateUser,
  type UpdateUserPayload,
  type UserListItem,
} from "@/services/users.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, Network } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function UsersPage() {
  const meEmail = useAuthStore((s) => s.loginResponse?.user?.email ?? "");
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<10 | 25 | 50 | 100>(10);
  const [q, setQ] = useState("");
  const [roleId, setRoleId] = useState<"all" | number>("all");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [department, setDepartment] = useState<string>("all");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [sessionLogsOpen, setSessionLogsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserListItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserListItem | null>(null);

  const statsQuery = useQuery({
    queryKey: ["users-stats"],
    queryFn: fetchUsersStats,
  });

  const rolesQuery = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => (await fetchUserRoles()).data,
  });

  const usersQuery = useQuery({
    queryKey: ["users", { page, limit, q, roleId, status, department }],
    queryFn: () =>
      fetchUsers({
        page,
        limit,
        q: q.trim() || undefined,
        roleId,
        status,
        department,
      }),
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users-stats"] }),
      ]);
      toast.success("User created");
      setUserModalOpen(false);
      setEditingUser(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Create failed")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users-stats"] }),
      ]);
      toast.success("User updated");
      setUserModalOpen(false);
      setEditingUser(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Update failed")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["users-stats"] }),
      ]);
      toast.success("User deleted");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Delete failed")),
  });

  const cards = statsQuery.data?.cards;
  const totalUsers = cards?.totalUsers ?? 0;

  const administrators = (cards?.superAdmins ?? 0) + (cards?.itAdmins ?? 0);
  const operators = cards?.managers ?? 0;
  const viewers = cards?.employees ?? 0;

  const roleDist = useMemo(
    () => statsQuery.data?.roleDistribution ?? [],
    [statsQuery.data?.roleDistribution],
  );

  const donutSegments = useMemo(() => {
    return roleDist
      .filter((r) => r.count > 0)
      .map((r) => {
        const s = roleStyle(r.name);
        const color =
          s.dot === "bg-[#8b5cf6]"
            ? "#8b5cf6"
            : s.dot === "bg-[#3b82f6]"
              ? "#3b82f6"
              : s.dot === "bg-[#f59e0b]"
                ? "#f59e0b"
                : s.dot === "bg-[#06b6d4]"
                  ? "#06b6d4"
                  : "#22c55e";
        return { name: r.name, count: r.count, color };
      })
      .slice(0, 6);
  }, [roleDist]);

  const roleLegend = useMemo(() => {
    return donutSegments
      .slice()
      .sort((a, b) => b.count - a.count)
      .map((s) => ({
        ...s,
        label: titleCase(s.name),
        pct: toPct(s.count, totalUsers),
      }));
  }, [donutSegments, totalUsers]);

  const users = useMemo(() => usersQuery.data?.data ?? [], [usersQuery.data?.data]);
  const meta = usersQuery.data?.meta;

  const recentActivity = useMemo(() => {
    const ipFromId = (id: number) => `192.168.1.${(id % 240) + 10}`;
    const actions = [
      "Logged in",
      "Updated device configuration",
      "Created new alert rule",
      "Exported system logs",
      "Viewed monitoring dashboard",
    ];

    return users.slice(0, 5).map((u, i) => ({
      id: u.id,
      name: u.name,
      action: actions[i % actions.length],
      at: u.lastLoginAt,
      ip: ipFromId(u.id),
      icon: i % 2 === 0 ? Activity : Network,
    }));
  }, [users]);

  const statusSummary = useMemo(() => {
    const active = cards?.activeUsers ?? 0;
    const inactive = Math.max(0, (cards?.totalUsers ?? 0) - active);
    const locked = 0;
    const total = Math.max(1, cards?.totalUsers ?? 0);
    return {
      active,
      inactive,
      locked,
      total,
      activePct: toPct(active, total),
      inactivePct: toPct(inactive, total),
      lockedPct: toPct(locked, total),
    };
  }, [cards?.activeUsers, cards?.totalUsers]);

  const totalPages = meta?.totalPages ?? 1;
  const showingFrom = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const showingTo = meta ? Math.min(meta.total, meta.page * meta.limit) : 0;
  const total = meta?.total ?? 0;

  const roleOptions = rolesQuery.data ?? [];

  const openCreate = () => {
    setEditingUser(null);
    setUserModalOpen(true);
  };

  const openEdit = (u: UserListItem) => {
    setEditingUser(u);
    setUserModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <UsersHeader onAdd={openCreate} onOpenSessionLogs={() => setSessionLogsOpen(true)} />

        <UsersSummaryGrid
          totalUsers={cards?.totalUsers ?? 0}
          activeUsers={cards?.activeUsers ?? 0}
          administrators={administrators}
          operators={operators}
          viewers={viewers}
        />

        <UsersTablePanel
          q={q}
          onChangeQ={(v) => {
            setPage(1);
            setQ(v);
          }}
          roleId={roleId}
          onChangeRoleId={(v) => {
            setPage(1);
            setRoleId(v);
          }}
          status={status}
          onChangeStatus={(v) => {
            setPage(1);
            setStatus(v);
          }}
          department={department}
          onChangeDepartment={(v) => {
            setPage(1);
            setDepartment(v);
          }}
          roleOptions={roleOptions}
          users={users}
          usersLoading={usersQuery.isLoading}
          meEmail={meEmail}
          onEdit={openEdit}
          onDelete={(u) => setDeleteTarget(u)}
          page={page}
          totalPages={totalPages}
          total={total}
          showingFrom={showingFrom}
          showingTo={showingTo}
          limit={limit}
          onChangePage={setPage}
          onChangeLimit={(l) => {
            setPage(1);
            setLimit(l);
          }}
        />

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
          <RoleDistributionCard totalUsers={totalUsers} segments={donutSegments} legend={roleLegend} />
          <RecentActivityCard items={recentActivity} />
          <UserStatusSecurityCard statusSummary={statusSummary} totalUsers={totalUsers} />
        </div>
      </div>

      <UserModal
        open={userModalOpen}
        roles={roleOptions}
        mode={editingUser ? "edit" : "create"}
        user={editingUser}
        busy={createMutation.isPending || updateMutation.isPending}
        onClose={() => {
          if (createMutation.isPending || updateMutation.isPending) return;
          setUserModalOpen(false);
          setEditingUser(null);
        }}
        onCreate={(payload) => createMutation.mutate(payload)}
        onUpdate={(payload) => {
          if (!editingUser) return;
          updateMutation.mutate({ id: editingUser.id, payload });
        }}
      />

      <AuthSessionLogsModal open={sessionLogsOpen} onClose={() => setSessionLogsOpen(false)} />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete user"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        confirmDanger
        busy={deleteMutation.isPending}
        onClose={() => {
          if (deleteMutation.isPending) return;
          setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteMutation.mutate(deleteTarget.id);
        }}
      />
    </DashboardLayout>
  );
}

