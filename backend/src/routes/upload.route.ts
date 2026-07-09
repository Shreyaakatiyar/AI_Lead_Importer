import { Router } from "express";
import multer from "multer";
import { parseCSV } from "../services/csv.service.js";
import { testGemini } from "../services/gemini.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("========== NEW REQUEST ==========");

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    console.log("✅ File received:", req.file.originalname);

    // Test CSV parsing
    const rows = await parseCSV(req.file.buffer);

    console.log("✅ CSV parsed successfully");
    console.log("Rows:", rows.length);

    // Test Gemini connection
    console.log("⏳ Calling Gemini...");

    const result = await testGemini();

    console.log("✅ Gemini replied:", result);

    return res.status(200).json({
      success: true,
      totalRows: rows.length,
      preview: rows.slice(0, 5),
      gemini: result,
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
