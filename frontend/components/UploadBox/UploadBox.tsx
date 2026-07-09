"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

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
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`mt-10 w-full max-w-3xl cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center shadow-sm transition-all duration-200
      ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50"
      }`}
    >
      <div className="space-y-4">
        <div className="text-6xl">
          {isDragging ? "📥" : "📄"}
        </div>

        <h2 className="text-2xl font-semibold text-black">
          {isDragging
            ? "Drop your CSV here"
            : "Upload your CSV"}
        </h2>

        <p className="text-gray-500">
          Drag & Drop your CSV here or click to browse.
        </p>

        <p className="text-sm text-gray-400">
          Supported format: .csv
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </section>
  );
}