import Papa from "papaparse";

export type CSVRow = Record<string, string>;

export function parseCSV(buffer: Buffer): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const csvText = buffer.toString("utf-8");

    Papa.parse<CSVRow>(csvText, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data);
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}