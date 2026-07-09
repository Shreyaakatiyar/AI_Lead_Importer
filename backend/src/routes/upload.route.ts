import { Router } from "express";
import multer from "multer";

import { parseCSV } from "../services/csv.service.js";
import { createBatches } from "../utils/batch.js";
import { mapCRMFields } from "../services/gemini.service.js";
import { importCSV } from "../services/import.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const rows = await parseCSV(req.file.buffer);

    const result = await importCSV(rows);

    return res.json({
        success: true,
        ...result
    });
  } catch (error) {
    console.error("========== ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;