"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import UploadBox from "@/components/UploadBox/UploadBox";
import { CSVRow } from "@/types/csv";
import { parseCSV } from "@/lib/csv";
import PreviewTable from "@/components/PreviewTable/PreviewTable";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<CSVRow[]>([]);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);

    try{
      const rows = await parseCSV(file);
      console.log(rows);
      setPreviewRows(rows);
    }
    catch (error) {
      console.error("Error parsing CSV:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 py-12">
        <Header />
        <UploadBox onFileSelect={handleFileSelect} />
        {selectedFile && (
          <p className="mt-6 text-gray-700">
            Selected File:{" "}
            <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}
        <PreviewTable rows={previewRows} />
      </div>
    </main>
  );
}
