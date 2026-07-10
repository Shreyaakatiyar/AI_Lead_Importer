import { Download, CheckCircle2, Zap } from "lucide-react";

interface ResultStatsProps {
  processedRows: number;
  importedRows: number;
  skippedRows: number;
  processingTimeMs: number;
  fasterThanPercent?: number;
  onDownloadErrorLog: () => void;
  onFinishImport: () => void;
}

export default function ResultStats({
  processedRows,
  importedRows,
  skippedRows,
  processingTimeMs,
  fasterThanPercent = 92,
  onDownloadErrorLog,
  onFinishImport,
}: ResultStatsProps) {
  const importedPercent = processedRows > 0 ? (importedRows / processedRows) * 100 : 0;
  const skippedPercent = processedRows > 0 ? (skippedRows / processedRows) * 100 : 0;

  return (
    <div className="w-full">
      {/* Success banner */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={20} className="text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Import Completed Successfully</h2>
            <p className="text-sm text-gray-500">
              Your data has been mapped, validated, and synced to your CRM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDownloadErrorLog}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download size={14} /> Download Error Log
          </button>
          <button
            onClick={onFinishImport}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Finish Import
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm text-gray-500">Processed Rows</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">{processedRows.toLocaleString()}</p>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-100">
            <div className="h-full w-full rounded-full bg-gray-900" />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm text-gray-500">Imported Leads</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">{importedRows.toLocaleString()}</p>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${importedPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm text-gray-500">Skipped Records</h3>
          <p className="mt-2 text-2xl font-bold text-red-500">{skippedRows.toLocaleString()}</p>
          <div className="mt-3 h-1 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-red-400"
              style={{ width: `${skippedPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm text-gray-500">Processing Time</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {(processingTimeMs / 1000).toFixed(1)}s
          </p>
          <p className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
            <Zap size={12} /> Faster than {fasterThanPercent}% of imports
          </p>
        </div>
      </div>
    </div>
  );
}