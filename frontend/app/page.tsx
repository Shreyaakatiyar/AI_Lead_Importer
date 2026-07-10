"use client";

import { useState, useRef } from "react";
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
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";

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

  const abortControllerRef = useRef<AbortController | null>(null);

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
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      setCurrentStep("process");

      const result = await uploadCSV(selectedFile, controller.signal);
      console.log("uploadCSV result:", result);

      setCRMRecords(result.records);

      setStats(result);
      setPreviewRows([]);  
      setCurrentStep("results");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setCurrentStep("preview");
      } else {
        console.error(error);
        setCurrentStep("preview");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelImport = () => {
    abortControllerRef.current?.abort();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen w-full flex-col bg-background text-text">
        <Header />
        <Stepper currentStep={currentStep} />
        <div className="flex w-full flex-1 items-center justify-center px-6 py-12">
          <Loader onCancel={handleCancelImport} />
        </div>
      </main>
    );
  }

  const handleFinishImport = () => {
    setSelectedFile(null);
    setPreviewRows([]);
    setCRMRecords([]);
    setStats(null);
    setCurrentStep("upload");
  };  

  if (crmRecords.length > 0 && stats) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background text-text">
      <Header />
      <Stepper currentStep={currentStep} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ResultStats
          processedRows={stats.processedRows}
          importedRows={stats.importedRows}
          skippedRows={stats.skippedRows}
          processingTimeMs={stats.processingTimeMs}
          onFinishImport={handleFinishImport}
        />
        <ResultTable records={crmRecords} />
        
      </div>
      <Footer />
    </main>
  );
}

  return (
    <main className="min-h-screen bg-background text-text flex flex-col">
      <Header />
      <Stepper currentStep={currentStep} />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:px-8">
        {previewRows.length > 0 ? (
          <PreviewTable
          rows={previewRows}
          fileName={selectedFile?.name ?? ""}
          onChangeFile={() => {
            setSelectedFile(null);
            setPreviewRows([]);
            setCurrentStep("upload");
          }}
          onContinue={handleImport}
        />
        ) : (
          <>
          <Hero />
          <UploadBox onFileSelect={handleFileSelect} />
          {selectedFile && (
            <p className="text-gray-700">
              Selected File:{" "}
              <span className="font-semibold">{selectedFile.name}</span>
            </p>
          )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
