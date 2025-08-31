import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generateRecipeSummary } from "../utils/AISummary";

const RecipeCard = ({ recipe }) => {
  const [aiSummary, setAiSummary] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  const handleGetAISummary = async (e) => {
    e.preventDefault(); // Prevent navigation to recipe detail
    e.stopPropagation(); // Stop event bubbling

    if (aiSummary) {
      // If summary exists, clear it (toggle behavior)
      setAiSummary("");
      return;
    }

    setIsLoadingSummary(true);
    setSummaryError("");

    try {
      const summary = await generateRecipeSummary(
        recipe.strMeal,
        recipe.strCategory,
        recipe.strArea
      );
      setAiSummary(summary);
    } catch (error) {
      setSummaryError("Unable to generate summary. Please try again.");
      console.error("AI Summary error:", error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <li className="recipe-card">
      <Link to={`/recipeDetail/${recipe.idMeal}`}>
        <p>
          {recipe.strMeal} <span>({recipe.idMeal})</span>
        </p>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
      </Link>

      {/* AI Summary Button */}
      <button
        className="ai-summary-btn"
        onClick={handleGetAISummary}
        disabled={isLoadingSummary}
      >
        {isLoadingSummary
          ? "🤔 Thinking..."
          : aiSummary
          ? "🧠 Hide Summary"
          : "🧠 AI Summary"}
      </button>

      {/* AI Summary Display */}
      {aiSummary && (
        <div className="ai-summary">
          <p>{aiSummary}</p>
        </div>
      )}

      {/* Error Display */}
      {summaryError && (
        <div className="ai-summary-error">
          <p>{summaryError}</p>
        </div>
      )}
    </li>
  );
};

export default RecipeCard;
