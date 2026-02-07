
import { GoogleGenAI } from "@google/genai";
import { AppState } from "../types";

export const getAIInsights = async (state: AppState) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const prompt = `
    As a professional fitness and nutrition coach, analyze the following user fitness data and provide 3 concise, actionable insights.
    
    Goal: ${state.goal.type} (Target Weight: ${state.goal.targetWeight}kg, Target Steps: ${state.goal.targetSteps})
    Recent Workouts: ${JSON.stringify(state.workouts.slice(0, 5))}
    Daily Progress: ${JSON.stringify(state.dailyStats.slice(0, 7))}

    Format the response as a valid JSON array of objects with 'title', 'advice', and 'priority' (High, Medium, Low). 
    Do not include markdown markers like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { title: "Keep it up!", advice: "Consistency is key. Try to hit your step goal daily.", priority: "Medium" }
    ];
  }
};
