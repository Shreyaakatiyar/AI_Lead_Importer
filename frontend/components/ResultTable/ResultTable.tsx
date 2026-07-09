"use client";

import { CRMRecord } from "@/types/crm";

interface ResultTableProps {
  records: CRMRecord[];
}

const columns: {
  label: string;
  key: keyof CRMRecord;
}[] = [
  { label: "Created At", key: "created_at" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Country Code", key: "country_code" },
  {
    label: "Mobile",
    key: "mobile_without_country_code",
  },
  { label: "Company", key: "company" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Country", key: "country" },
  { label: "Lead Owner", key: "lead_owner" },
  { label: "CRM Status", key: "crm_status" },
  { label: "CRM Note", key: "crm_note" },
  { label: "Data Source", key: "data_source" },
  {
    label: "Possession Time",
    key: "possession_time",
  },
  { label: "Description", key: "description" },
];

export default function ResultTable({
  records,
}: ResultTableProps) {
  if (records.length === 0) return null;

  return (
    <section className="mt-10 w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">
          AI Extracted CRM Records
        </h2>

        <p className="text-sm text-gray-500">
          {records.length} records
        </p>
      </div>

      <div className="max-h-[600px] overflow-auto rounded-xl border border-gray-200 bg-white shadow">
        <table className="min-w-max border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap border-b border-gray-200 px-5 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.map((record, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="max-w-[250px] whitespace-nowrap px-5 py-3 text-sm text-gray-700"
                  >
                    {record[column.key] || (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}