import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const RecipeDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getRecipeDetail = async () => {
            const details = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`);
            const detailsJson = await details.json();
            setFullDetails(detailsJson);
        };
        getRecipeDetail().catch(console.error);
    }, [params.id]);

    // if (!fullDetails) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="whole-page">
            {fullDetails ?
                <>
                    <h1>{fullDetails.title}</h1>
                    <img
                        className="images"
                        src={fullDetails.image}
                        alt={`Recipe image`}
                    />
                    <br />
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <th>Cooking Time</th>
                                <td>{fullDetails.cookingMinutes || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Servings</th>
                                <td>{fullDetails.servings || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Health Score</th>
                                <td>{fullDetails.healthScore || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>DairyFree</th>
                                <td>{fullDetails.dairyFree || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Spoonacular Website Info</th>
                                <td>{fullDetails.spoonacularSourceUrl ? <a href={fullDetails.spoonacularSourceUrl} target="_blank" rel="noopener noreferrer">Recipe Webpage</a> : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Gluten Free</th>
                                <td>{fullDetails.glutenFree || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Vegan</th>
                                <td>{fullDetails.vegan || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Dish Types</th>
                                <td>{fullDetails.dishTypes || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
                : <p>Still Loading</p>
            }


        </div>
    );
}

export default RecipeDetail