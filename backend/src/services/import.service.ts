import type { CSVRow } from "./csv.service.js";
import { createBatches } from "../utils/batch.js";
import { mapCRMFields } from "./gemini.service.js";

export async function importCSV(rows: CSVRow[]) {
  const startTime = Date.now();
  const batchSize = 100;

  const batches = createBatches(rows, batchSize);

  const importedRecords = [];

  for (const [index, batch] of batches.entries()) {
    try {
      console.log(
        `Processing batch ${index + 1}/${batches.length}`
      );

      const records = await mapCRMFields(batch);

      importedRecords.push(...records);
    } catch (error) {
      console.error(
        `Batch ${index + 1} failed:`,
        error
      );
    }
  }

  const processingTimeMs = Date.now() - startTime;

  return {
    processedRows: rows.length,
    importedRows: importedRecords.length,
    skippedRows: rows.length - importedRecords.length,
    processingTimeMs,
    totalBatches: batches.length,
    records: importedRecords,
  };
}