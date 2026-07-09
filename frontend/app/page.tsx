"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import UploadBox from "@/components/UploadBox/UploadBox";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
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
      </div>
    </main>
  );
}
