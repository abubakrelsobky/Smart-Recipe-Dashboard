// AI summary generator using Google Gemini API
const API_KEY = import.meta.env.VITE_AI_API_KEY;

export const generateRecipeSummary = async (recipeName, category, cuisine) => {
  const prompt = `Generate a brief, engaging summary for this recipe: ${recipeName}. It's a ${
    cuisine || "international"
  } ${
    category || "dish"
  }. Keep it under 100 words and make it appetizing with modest use of emojis.`;

  // Send request to Google Gemini AI API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }], // Format required by Gemini API
        generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
      }),
    }
  );

  if (!response.ok) {
    const status = response.status;
    if (status === 403)
      throw new Error(
        "API key authentication failed. Please check your Gemini API key."
      );
    if (status === 429)
      throw new Error("API rate limit exceeded. Please try again in a moment.");
    throw new Error("Unable to generate AI summary. Please try again later.");
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Unable to generate summary for this recipe."
  );
};
