import { GoogleGenAI } from "@google/genai";
import apiKeyRotator from "./apiKeysRotator.js";


const buildAIPrompt = (aiContext) => {
  return `
    You are a productivity coach AI.

    Analyze the user's last 7 days task performance data.
    Give concise, actionable insights.

    Rules:
    - Respond ONLY in valid JSON
    - Do NOT add explanations outside JSON
    - Do NOT wrap response in markdown code blocks

    Data:
    ${JSON.stringify(aiContext, null, 2)}

    Return JSON in this exact format:
    {
    "insights": [],
    "warnings": [],
    "suggestions": [],
    "motivation": ""
    }
    `;
};

// Helper function to clean AI response
const cleanAIResponse = (text) => {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  
  // Remove ```json at the start
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  
  // Remove ``` at the end
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  
  return cleaned.trim();
};

export const getAIAnalysis = async (aiContext) => {
  try {
    // Get the next API key in rotation
    const apiKey = apiKeyRotator.getNextKey();
    
    console.log(`Using API key #${apiKeyRotator.getCurrentIndex()+1} of ${apiKeyRotator.getTotalKeys()}`);
    
    // Create AI instance with rotated key
    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    const prompt = buildAIPrompt(aiContext);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const cleanedText = cleanAIResponse(response.text);
    
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error("AI Analysis Error:", error);
    
    // Return fallback response if AI fails
    return {
      insights: ["Unable to generate insights at this time"],
      warnings: [],
      suggestions: ["Keep tracking your tasks consistently"],
      motivation: "Stay focused on your goals!"
    };
  }
};