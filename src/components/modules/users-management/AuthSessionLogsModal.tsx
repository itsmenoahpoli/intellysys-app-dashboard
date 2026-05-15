import { useQuery } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  fetchAuthSessionLogs,
  type AuthSessionLog,
} from "@/services/auth-session-logs.service";

const formatDateTime = (raw?: string) => {
  if (!raw) return "—";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
};

const formatAction = (raw?: string) => {
  if (!raw) return "—";
  return raw.slice(0, 1).toUpperCase() + raw.slice(1).toLowerCase();
};

export default function AuthSessionLogsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState<10 | 25 | 50>(10);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const query = useMemo(() => {
    const uid = userId.trim();
    const userIdNum = uid ? Number(uid) : undefined;
    return {
      page,
      limit,
      userId: Number.isFinite(userIdNum) ? userIdNum : undefined,
      startDate: startDate.trim() || undefined,
      endDate: endDate.trim() || undefined,
    };
  }, [endDate, limit, page, startDate, userId]);

  const logsQuery = useQuery({
    queryKey: ["auth-session-logs", query],
    queryFn: () => fetchAuthSessionLogs(query),
    enabled: open,
  });

  const logs = useMemo(() => logsQuery.data?.data ?? [], [logsQuery.data]);
  const meta = logsQuery.data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const emptyLabel = logsQuery.isLoading
    ? "Loading session logs..."
    : "No session logs found.";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-surface p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">Session Logs</div>
            <div className="mt-1 text-xs text-secondary">
              Review recent authentication activity across users.
            </div>
          </div>
          <button
            className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-dark/40 p-4 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-medium text-secondary">
              User ID
            </label>
            <input
              value={userId}
              onChange={(e) => {
                setPage(1);
                setUserId(e.target.value);
              }}
              inputMode="numeric"
              placeholder="e.g. 12"
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-medium text-secondary">
              Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setPage(1);
                setStartDate(e.target.value);
              }}
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-medium text-secondary">
              End date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setPage(1);
                setEndDate(e.target.value);
              }}
              className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="sm:col-span-2 sm:flex sm:items-end">
            <button
              type="button"
              onClick={() => {
                setPage(1);
                setUserId("");
                setStartDate("");
                setEndDate("");
              }}
              aria-label="Clear filters"
              title="Clear filters"
              className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-sm font-medium text-red-200 hover:bg-red-500/15 hover:text-white"
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-dark/40">
          <div className="overflow-auto">
            <table className="min-w-[920px] w-full border-collapse text-left text-sm">
              <thead className="bg-transparent text-[11px] text-secondary">
                <tr>
                  <th className="px-4 py-3 font-medium">USER</th>
                  <th className="px-4 py-3 font-medium">ACTION</th>
                  <th className="px-4 py-3 font-medium">IP ADDRESS</th>
                  <th className="px-4 py-3 font-medium">USER AGENT</th>
                  <th className="px-4 py-3 font-medium">TIME</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-secondary">
                      {emptyLabel}
                    </td>
                  </tr>
                ) : (
                  logs.map((log: AuthSessionLog) => (
                    <tr
                      key={log.id}
                      className="border-t border-white/5 text-secondary hover:bg-white/4 hover:text-white"
                    >
                      <td className="px-4 py-3 text-white">
                        <div className="min-w-0">
                          <div className="truncate font-medium text-white">{log.user?.name ?? "—"}</div>
                          <div className="truncate text-xs text-secondary">{log.user?.email ?? "—"}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white">
                          {formatAction(log.action)}
                        </span>
                      </td>
                      <td className="px-4 py-3">{log.ipAddress ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className="block max-w-[320px] truncate">{log.userAgent ?? "—"}</span>
                      </td>
                      <td className="px-4 py-3">{formatDateTime(log.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-secondary">
          <div>
            Page {meta?.page ?? page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1 || logsQuery.isLoading}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white hover:bg-white/5 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages || logsQuery.isLoading}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white hover:bg-white/5 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
