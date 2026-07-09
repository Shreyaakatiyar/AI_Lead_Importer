import { GoogleGenAI } from "@google/genai";
import { buildCRMPrompt } from "../prompts/crm.prompt.js";
import type { CSVRow } from "../services/csv.service.js";

export async function mapCRMFields(records: CSVRow[]) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const prompt = buildCRMPrompt(records);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Gemini Raw Response:\n", response.text);
    throw new Error("Failed to parse Gemini JSON response.");
  }
}