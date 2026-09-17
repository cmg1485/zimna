
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this context, we'll throw an error if the key is missing.
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function getFunFact(topic: string): Promise<string> {
  if (!API_KEY) {
    return "Gemini API key is not configured. Fun fact feature is disabled.";
  }
  
  try {
    const prompt = `Tell me a short, interesting, and kid-friendly fun fact about ${topic}. Keep it to one or two sentences.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error(`Error fetching fun fact for topic "${topic}":`, error);
    throw new Error('Failed to communicate with Gemini API.');
  }
}
