import { GoogleGenAI } from "@google/genai";

export async function testGemini() {
  console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Reply with exactly: Gemini Connected",
  });

  return response.text;
}