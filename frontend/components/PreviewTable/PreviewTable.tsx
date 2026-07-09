import { CSVRow } from "@/types/csv";

interface PreviewTableProps {
  rows: CSVRow[];
}

export default function PreviewTable({ rows }: PreviewTableProps) {
  if (rows.length === 0) {
    return null;
  }

  const headers = Object.keys(rows[0]);

  return (
    <section className="mt-10 w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">CSV Preview</h2>

        <p className="text-sm text-gray-500">
          Showing {Math.min(rows.length, 10)} of {rows.length} rows
        </p>
      </div>

      <div className="max-h-125 overflow-auto rounded-xl border bg-white shadow">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b bg-gray-100 px-4 py-3 text-left text-black"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
              {rows.slice(0,30).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="border-b px-4 py-3 text-sm text-gray-700"
                    >
                      {row[header] || "-"}
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
