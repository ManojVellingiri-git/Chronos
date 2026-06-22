import { GoogleGenAI } from '@google/genai';

const globalForGemini = global as unknown as { ai: GoogleGenAI };

export const ai =
  globalForGemini.ai ||
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key" });

if (process.env.NODE_ENV !== 'production') globalForGemini.ai = ai;

export const MODELS = {
  FAST: 'gemini-2.5-flash',
  REASONING: 'gemini-2.5-pro',
};
