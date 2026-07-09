import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.listen(PORT, () => {
  console.log("🚀 Backend Server Started");
  console.log(`📍 URL: http://localhost:${PORT}`);
});