"use client";

import { CSVRow } from "@/types/csv";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface PreviewTableProps {
  rows: CSVRow[];
  fileName: string;
  onChangeFile: () => void;
  onContinue: () => void;
}

export default function PreviewTable({
  rows,
  fileName,
  onChangeFile,
  onContinue,
}: PreviewTableProps) {
  if (rows.length === 0) {
    return null;
  }

  const headers = Object.keys(rows[0]);
  const previewRows = rows.slice(0, 20);

  return (
    <section className="w-full max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileText size={22} className="text-gray-700" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{fileName}</h2>
            <p className="text-sm text-gray-500">
              System detected <span className="font-semibold text-gray-700">{rows.length.toLocaleString()} rows</span> ready for AI enrichment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onChangeFile}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Change File
          </button>
          <button
            onClick={onContinue}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 cursor-pointer"
          >
            Continue with AI <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Data Preview (First 20 rows)</h3>
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 size={12} /> Schema Validated
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-gray-100 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50">
                  {headers.map((header) => {
                    const value = row[header] || "-";
                    const isCompanyLike = header.toLowerCase().includes("company");
                    return (
                      <td key={header} className="px-6 py-4 text-sm text-gray-700">
                        {isCompanyLike ? (
                          <span className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-700">
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 py-4 text-center text-sm italic text-gray-400">
          Showing {previewRows.length} of {rows.length.toLocaleString()} records
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 cursor-pointer"
        >
          Continue with AI Processing <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}