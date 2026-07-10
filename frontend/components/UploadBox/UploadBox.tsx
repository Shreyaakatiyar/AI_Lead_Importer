"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { UploadCloud, FileText, Download } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file.");
      return;
    }

    onFileSelect(file);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    handleFile(files[0]);
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (!files || files.length === 0) return;

    handleFile(files[0]);
  };

  return (
    <div className="mt-6 w-full max-w-3xl px-2 sm:mt-10 sm:px-0">
      <section
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border p-6 text-center shadow-sm transition-all duration-200 sm:p-8 lg:p-10
        ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <UploadCloud size={24} className="text-gray-700" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            {isDragging ? "Drop your CSV here" : "Click to upload or drag and drop"}
          </h2>

          <p className="text-sm text-gray-500">
            Drag & Drop your CSV here or click to browse.
          </p>

          <span className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
            <FileText size={14} /> .csv
          </span>

          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </section>

      <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <a
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 hover:text-gray-700"
          href="/sample-leads.csv"
          download="sample-leads.csv"
        >
          <Download size={14} /> Download sample CSV template
        </a>
        <span className="text-center sm:text-left">Maximum file size: 50MB</span>
      </div>
    </div>
  );
}