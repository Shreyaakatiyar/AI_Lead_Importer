import { ImportResponse } from "@/types/api";

const BASE_URL = "http://localhost:8000";

export async function uploadCSV(
  file: File,
  signal?: AbortSignal
): Promise<ImportResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error("Upload failed.");
  }

  return response.json();
}

