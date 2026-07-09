import { CRMRecord } from "@/types/crm";
import { useState } from "react";

interface ResultTableProps {
  records: CRMRecord[];
}

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

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              {[
                "Name",
                "Email",
                "Mobile",
                "Company",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="border-b px-4 py-3 text-left text-black"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-700">
                  {record.name ?? "—"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {record.email ?? "—"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {record.mobile_without_country_code ?? "—"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {record.company ?? "—"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {record.crm_status ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}