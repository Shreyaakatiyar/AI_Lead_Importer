import { ChangeEvent } from "react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    onFileSelect(file);
  };

  return (
    <section className="mt-10 w-full max-w-3xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
      <div className="space-y-4">
        <div className="text-6xl">📄</div>

        <h2 className="text-2xl font-semibold">Upload your CSV</h2>

        <p className="text-gray-500">
          Drag & Drop your CSV here or choose a file.
        </p>

        <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange}
        className="text-black"
        />
      </div>
    </section>
  );
}
