
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateDescription = async (keywords: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on these keywords: "${keywords}", write a compelling and professional project description for an architecture portfolio. The tone should be sophisticated and highlight design principles. Keep it to one paragraph.`,
        config: {
            systemInstruction: "You are an expert architectural writer, crafting compelling and professional project descriptions for high-end portfolios."
        }
    });

    return response.text;
  } catch (error) {
    console.error('Error generating description:', error);
    return 'Failed to generate description. Please check your API key and try again.';
  }
};
