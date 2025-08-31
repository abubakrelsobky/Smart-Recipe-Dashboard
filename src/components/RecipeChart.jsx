import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

// No API key needed for TheMealDB!

const RecipeChart = ({ recipes }) => {
  const [chartData, setChartData] = useState([]);

  // Function to count non-empty ingredients in a recipe
  const countIngredients = (recipe) => {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    console.log("RecipeChart received recipes:", recipes);

    const fetchRecipeDetails = async () => {
      if (recipes && recipes.length > 0) {
        // Check if recipes have ingredient data
        const hasIngredients = recipes[0].strIngredient1 !== undefined;

        if (!hasIngredients) {
          console.log(
            "Recipes missing ingredient data, fetching full details..."
          );
          // Fetch full details for each recipe
          const detailedRecipes = await Promise.all(
            recipes.map(async (recipe) => {
              try {
                const response = await fetch(
                  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
                );
                const json = await response.json();
                return json.meals ? json.meals[0] : recipe;
              } catch (error) {
                console.error(
                  `Failed to fetch details for recipe ${recipe.idMeal}:`,
                  error
                );
                return recipe;
              }
            })
          );

          const data = detailedRecipes.map((recipe) => {
            const count = countIngredients(recipe);
            console.log(
              `Recipe ${recipe.idMeal} (${recipe.strMeal}): ${count} ingredients`
            );
            return {
              id: recipe.idMeal,
              ingredientCount: count,
            };
          });

          console.log("Chart data with full details:", data);
          setChartData(data);
        } else {
          // Recipes already have ingredient data
          const data = recipes.map((recipe) => {
            const count = countIngredients(recipe);
            console.log(
              `Recipe ${recipe.idMeal} (${recipe.strMeal}): ${count} ingredients`
            );
            return {
              id: recipe.idMeal,
              ingredientCount: count,
            };
          });
          console.log("Chart data:", data);
          setChartData(data);
        }
      }
    };

    fetchRecipeDetails();
  }, [recipes]);

  return (
    <div>
      {chartData.length > 0 ? (
        <div>
          <br />
          <h2>Recipe Complexity (Ingredient Count)</h2>

          <LineChart
            width={1400}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 70,
              left: 70,
              bottom: 100,
            }}
          >
            <Line
              type="monotone"
              dataKey="ingredientCount"
              stroke="#8884d8"
              activeDot={{ r: 5 }}
            />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="id" interval={0} angle={20} dx={20} dy={30}>
              <Label
                value="Recipe ID"
                offset={0}
                position="insideBottom"
                dy={80}
              />
            </XAxis>

            <YAxis
              label={{
                value: "Number of Ingredients",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
                dy: 20,
                dx: -60,
              }}
            />
            <Tooltip />
          </LineChart>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecipeChart;
