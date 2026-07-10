"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import UploadBox from "@/components/UploadBox/UploadBox";
import Stepper, {Step} from "@/components/Stepper/Stepper";
import { CSVRow } from "@/types/csv";
import { parseCSV } from "@/lib/csv";
import PreviewTable from "@/components/PreviewTable/PreviewTable";
import { uploadCSV } from "@/services/api";
import { CRMRecord } from "@/types/crm";
import Loader from "@/components/Loader/Loader";
import ResultStats from "@/components/ResultStats/ResultStats";
import ResultTable from "@/components/ResultTable/ResultTable";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<CSVRow[]>([]);
  const [crmRecords, setCRMRecords] = useState<CRMRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{
    processedRows: number;
    importedRows: number;
    skippedRows: number;
    totalBatches: number;
    processingTimeMs: number;
  } | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);

    try {
      const rows = await parseCSV(file);
      console.log(rows);
      setPreviewRows(rows);
      setCurrentStep("preview");
    } catch (error) {
      console.error("Error parsing CSV:", error);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setCurrentStep("process");

      const result = await uploadCSV(selectedFile);

      setCRMRecords(result.records);

      setStats(result);
      setCurrentStep("results");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen w-full flex-col bg-background text-text">
        <Header />
        <Stepper currentStep={currentStep} />
        <div className="flex w-full flex-1 items-center justify-center px-6 py-12">
          <Loader />
        </div>
      </main>
    );
  }

  if (crmRecords.length > 0 && stats) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12">
          <Header />
          <Stepper currentStep={currentStep} />

          <ResultStats
            processedRows={stats.processedRows}
            importedRows={stats.importedRows}
            skippedRows={stats.skippedRows}
            processingTimeMs={stats.processingTimeMs}
          />

          <ResultTable records={crmRecords} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text flex flex-col">
      <Header />
      <Stepper currentStep={currentStep} />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
        <UploadBox onFileSelect={handleFileSelect} />
        {selectedFile && (
          <p className="text-gray-700">
            Selected File:{" "}
            <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}
        <PreviewTable rows={previewRows} />
        {previewRows.length > 0 && (
          <button
            onClick={handleImport}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Confirm Import
          </button>
        )}
      </div>
    </main>
  );
}
