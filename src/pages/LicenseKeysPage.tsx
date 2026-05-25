import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import {
  LicenseKeysHeader,
  LicenseKeysSummaryGrid,
  LicenseKeysTablePanel,
  LicenseKeyModal,
} from "@/components/modules/license-keys-management";
import { ConfirmDialog, extractErrorMessage } from "@/components/modules/users-management";
import {
  createLicenseKey,
  deleteLicenseKey,
  fetchLicenseKeys,
  fetchLicenseKeysStats,
  updateLicenseKey,
  type LicenseKeyItem,
} from "@/services/license-keys.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LicenseKeysPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<10 | 25 | 50 | 100>(10);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "unused" | "used" | "revoked">("all");
  const [sortBy, setSortBy] = useState<"code" | "status" | "expiresAt" | "createdAt" | "updatedAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LicenseKeyItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LicenseKeyItem | null>(null);

  const statsQuery = useQuery({
    queryKey: ["license-keys-stats"],
    queryFn: fetchLicenseKeysStats,
  });

  const keysQuery = useQuery({
    queryKey: ["license-keys", { page, limit, q, status, sortBy, sortOrder }],
    queryFn: () =>
      fetchLicenseKeys({
        page,
        limit,
        q: q.trim() || undefined,
        status: status === "all" ? undefined : status,
        sortBy,
        sortOrder,
      }),
  });

  const createMutation = useMutation({
    mutationFn: createLicenseKey,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["license-keys"] }),
        queryClient.invalidateQueries({ queryKey: ["license-keys-stats"] }),
      ]);
      toast.success("License key created successfully");
      setKeyModalOpen(false);
      setEditingItem(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Failed to create license key")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateLicenseKey(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["license-keys"] }),
        queryClient.invalidateQueries({ queryKey: ["license-keys-stats"] }),
      ]);
      toast.success("License key updated successfully");
      setKeyModalOpen(false);
      setEditingItem(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Failed to update license key")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteLicenseKey(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["license-keys"] }),
        queryClient.invalidateQueries({ queryKey: ["license-keys-stats"] }),
      ]);
      toast.success("License key deleted successfully");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => toast.error(extractErrorMessage(err, "Failed to delete license key")),
  });

  const totalKeys = statsQuery.data?.total ?? 0;
  const unusedKeys = statsQuery.data?.unused ?? 0;
  const usedKeys = statsQuery.data?.used ?? 0;
  const revokedKeys = statsQuery.data?.revoked ?? 0;

  const items = keysQuery.data?.data ?? [];
  const meta = keysQuery.data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const showingFrom = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const showingTo = meta ? Math.min(meta.total, meta.page * meta.limit) : 0;
  const total = meta?.total ?? 0;

  const openCreate = () => {
    setEditingItem(null);
    setKeyModalOpen(true);
  };

  const openEdit = (item: LicenseKeyItem) => {
    setEditingItem(item);
    setKeyModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <LicenseKeysHeader onAdd={openCreate} />

        <LicenseKeysSummaryGrid
          total={totalKeys}
          unused={unusedKeys}
          used={usedKeys}
          revoked={revokedKeys}
        />

        <LicenseKeysTablePanel
          q={q}
          onChangeQ={(v) => {
            setPage(1);
            setQ(v);
          }}
          status={status}
          onChangeStatus={(v) => {
            setPage(1);
            setStatus(v);
          }}
          sortBy={sortBy}
          onChangeSortBy={(v) => {
            setPage(1);
            setSortBy(v);
          }}
          sortOrder={sortOrder}
          onChangeSortOrder={(v) => {
            setPage(1);
            setSortOrder(v);
          }}
          items={items}
          loading={keysQuery.isLoading}
          onEdit={openEdit}
          onDelete={(item) => setDeleteTarget(item)}
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
      </div>

      <LicenseKeyModal
        open={keyModalOpen}
        mode={editingItem ? "edit" : "create"}
        item={editingItem}
        busy={createMutation.isPending || updateMutation.isPending}
        onClose={() => {
          if (createMutation.isPending || updateMutation.isPending) return;
          setKeyModalOpen(false);
          setEditingItem(null);
        }}
        onCreate={(payload) => createMutation.mutate(payload)}
        onUpdate={(payload) => {
          if (!editingItem) return;
          updateMutation.mutate({ id: editingItem.id, payload });
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete License Key"
        description={
          deleteTarget
            ? `Are you sure you want to delete license key ${deleteTarget.code}? This action is destructive and cannot be undone.`
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
