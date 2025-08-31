// Simple AI summary generator using a mock implementation
// In a real app, this would call an actual AI service like OpenAI, Gemini, etc.

export const generateRecipeSummary = async (recipeName, category, cuisine) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI responses based on recipe characteristics
  const summaries = [
    `🍽️ ${recipeName} is a delicious ${cuisine} ${category} dish that's perfect for any occasion. This recipe combines traditional flavors with modern cooking techniques.`,
    `🌟 A fantastic ${cuisine} recipe! ${recipeName} offers a wonderful balance of flavors and textures, making it a crowd-pleaser for ${category} lovers.`,
    `🍳 ${recipeName} is an authentic ${cuisine} ${category} dish that brings together fresh ingredients and time-tested cooking methods for an unforgettable meal.`,
    `🥘 This ${cuisine} ${recipeName} is a perfect example of ${category} cuisine at its finest. Rich in flavor and easy to prepare, it's ideal for both beginners and experienced cooks.`,
    `🌮 Experience the authentic taste of ${cuisine} cuisine with this ${recipeName} recipe. This ${category} dish offers a delightful culinary journey with every bite.`,
  ];

  // Return a random summary
  return summaries[Math.floor(Math.random() * summaries.length)];
};
