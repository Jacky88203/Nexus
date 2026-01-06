
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithGemini = async (messages: { role: string; content: string }[]) => {
  const ai = getAI();
  const lastMessage = messages[messages.length - 1];
  
  // Basic Chat Implementation
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });

  return {
    text: response.text || "I couldn't generate a response.",
    sources: []
  };
};

export const researchWithGemini = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = groundingChunks
    .map((chunk: any) => chunk.web)
    .filter((web: any) => web && web.uri && web.title)
    .map((web: any) => ({
      title: web.title,
      uri: web.uri
    }));

  return {
    text: response.text || "No results found.",
    sources: sources
  };
};

export const generateImage = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let base64Data = '';
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      base64Data = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  if (!base64Data) throw new Error("No image was generated.");
  return base64Data;
};
