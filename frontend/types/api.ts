import { CRMRecord } from "./crm";

export interface ImportResponse {
  success: boolean;
  processedRows: number;
  importedRows: number;
  skippedRows: number;
  totalBatches: number;
  processingTimeMs: number;
  records: CRMRecord[];
}