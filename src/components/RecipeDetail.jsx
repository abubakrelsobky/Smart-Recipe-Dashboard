import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// No API key needed for TheMealDB!

const RecipeDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getRecipeDetail = async () => {
      const details = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
      );
      const detailsJson = await details.json();
      setFullDetails(detailsJson.meals ? detailsJson.meals[0] : null);
    };
    getRecipeDetail().catch(console.error);
  }, [params.id]);

  return (
    <div className="whole-page">
      {fullDetails ? (
        <>
          <h1>{fullDetails.strMeal}</h1>
          <img
            className="recipe-detail img"
            src={fullDetails.strMealThumb}
            alt={`Recipe image`}
            loading="lazy"
          />
          <br />
          <br />
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <td>{fullDetails.strCategory || "N/A"}</td>
              </tr>
              <tr>
                <th>Cuisine</th>
                <td>{fullDetails.strArea || "N/A"}</td>
              </tr>
              <tr>
                <th>Instructions</th>
                <td style={{ maxWidth: "500px", textAlign: "left" }}>
                  {fullDetails.strInstructions || "N/A"}
                </td>
              </tr>
              <tr>
                <th>YouTube Video</th>
                <td>
                  {fullDetails.strYoutube ? (
                    <a
                      href={fullDetails.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Recipe Video
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Source</th>
                <td>
                  {fullDetails.strSource ? (
                    <a
                      href={fullDetails.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original Recipe
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Tags</th>
                <td>{fullDetails.strTags || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>Still Loading</p>
      )}
    </div>
  );
};

export default RecipeDetail;
