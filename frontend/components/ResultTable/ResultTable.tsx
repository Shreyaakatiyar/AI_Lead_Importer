"use client";

import { useMemo, useState } from "react";
import { CRMRecord } from "@/types/crm";
import { Search, SlidersHorizontal, Columns3, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

interface ResultTableProps {
  records: CRMRecord[];
}

const PAGE_SIZE = 50;

const avatarColors = ["bg-indigo-500", "bg-gray-900", "bg-violet-500", "bg-teal-500", "bg-rose-500"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status?.toLowerCase();
  const styles: Record<string, string> = {
    success: "bg-green-50 text-green-700",
    duplicate: "bg-red-50 text-red-600",
    failed: "bg-red-50 text-red-600",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[normalized] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function ResultTable({ records }: ResultTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return records;
    const query = search.toLowerCase();
    return records.filter(
      (r) =>
        r.name?.toLowerCase().includes(query) ||
        r.email?.toLowerCase().includes(query) ||
        r.company?.toLowerCase().includes(query)
    );
  }, [records, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRecords = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (records.length === 0) return null;

  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <section className="mt-6 w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search results..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <Columns3 size={14} /> Columns
          </button>
          <button className="rounded-lg p-1.5 hover:bg-gray-50" aria-label="More options">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-max border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["Created At", "Name", "Email", "Status", "Company", "Mobile", "Location", "Lead Owner", "Source", "CRM Note"].map(
                (label) => (
                  <th
                    key={label}
                    className="whitespace-nowrap px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {pageRecords.map((record, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                  {record.created_at ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-900">
                  {record.name ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-indigo-600">
                  {record.email ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <StatusBadge status={record.crm_status ?? "—"} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                  {record.company ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                  {record.country_code || record.mobile_without_country_code
                    ? `${record.country_code ?? ""} ${record.mobile_without_country_code ?? ""}`.trim()
                    : "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                  {[record.city, record.country].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  {record.lead_owner ? (
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white ${getAvatarColor(
                          record.lead_owner
                        )}`}
                      >
                        {getInitials(record.lead_owner)}
                      </span>
                      <span className="text-sm text-gray-700">{record.lead_owner}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                  {record.data_source ?? "—"}
                </td>
                <td className="max-w-[220px] truncate whitespace-nowrap px-5 py-4 text-sm italic text-gray-500">
                  {record.crm_note ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 p-4 text-sm text-gray-500 sm:flex-row">
        <span>
          Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
          {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()} results
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg p-1.5 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-lg text-sm font-medium ${
                n === currentPage ? "bg-gray-900 text-white" : "hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}

          {totalPages > 3 && <span className="px-1">...</span>}
          {totalPages > 3 && (
            <button
              onClick={() => setPage(totalPages)}
              className={`h-8 w-8 rounded-lg text-sm font-medium ${
                totalPages === currentPage ? "bg-gray-900 text-white" : "hover:bg-gray-50"
              }`}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg p-1.5 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}