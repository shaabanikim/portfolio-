import { GoogleGenAI, Type } from "@google/genai";
import type { Portfolio } from '../types';

// FIX: Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const portfolioSchema = {
  type: Type.OBJECT,
  properties: {
    profile: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        title: { type: Type.STRING },
        bio: { type: Type.STRING },
      },
      required: ['name', 'title', 'bio'],
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['id', 'title', 'category', 'description'],
      },
    },
    contact: {
      type: Type.OBJECT,
      properties: {
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        website: { type: Type.STRING },
        instagram: { type: Type.STRING },
      },
      required: ['email', 'phone', 'website', 'instagram'],
    },
    resources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          fileUrl: { type: Type.STRING },
        },
        required: ['id', 'title', 'description', 'fileUrl'],
      },
    },
  },
  required: ['profile', 'projects', 'contact', 'resources'],
};


export async function updatePortfolioWithAI(
  currentPortfolio: Portfolio,
  prompt: string
): Promise<Portfolio> {
  // FIX: Use a recommended model for complex text tasks.
  const model = "gemini-2.5-pro";

  const fullPrompt = `
    You are an expert portfolio assistant. Your task is to update the following JSON portfolio based on the user's request.
    Only modify the text content (like bio, descriptions, titles, etc.).
    Do not change project IDs or resource IDs.
    Do not modify image URLs.
    Return the FULL, updated portfolio JSON object.

    Current Portfolio JSON:
    ${JSON.stringify({ ...currentPortfolio, projects: currentPortfolio.projects.map(p => ({...p, images: undefined})) }, null, 2)}

    User's Request:
    "${prompt}"

    Return the complete, updated JSON object that conforms to the provided schema.
  `;

  try {
    // FIX: Use ai.models.generateContent to call the Gemini API.
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: portfolioSchema,
      },
    });

    // FIX: Extract text directly from the response object.
    const jsonText = response.text.trim();
    const updatedData = JSON.parse(jsonText);

    // Re-attach images, as they were not part of the AI prompt to save tokens
    const finalPortfolio: Portfolio = {
      ...updatedData,
      profile: {
          ...updatedData.profile,
          profileImage: currentPortfolio.profile.profileImage,
      },
      projects: updatedData.projects.map((proj: any) => {
        const originalProject = currentPortfolio.projects.find(p => p.id === proj.id);
        return {
          ...proj,
          images: originalProject ? originalProject.images : [],
        };
      }),
    };

    return finalPortfolio;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate portfolio update from AI.");
  }
}
