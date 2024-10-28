import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const RecipeChart = ({ recipeIds }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchCookingTimes = async () => {
            const data = [];
            for (const id of recipeIds) {
                try {
                    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
                    const json = await response.json();
                    data.push({
                        id: id,
                        cookingTime: json.cookingMinutes || json.readyInMinutes || 0
                    });
                } catch (error) {
                    console.error(`Error fetching data for recipe ${id}:`, error);
                    // Add a placeholder in case of error
                    data.push({ id: id, cookingTime: 0 });
                }
            }
            setChartData(data);
        };

        if (recipeIds && recipeIds.length > 0) {
            fetchCookingTimes();
        }
    }, [recipeIds]);

    return (
        <div>
            {chartData.length > 0 ? (
                <div>
                    <br />
                    <h2>Cooking Times for Recipes</h2>

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
                            dataKey="cookingTime"
                            stroke="#8884d8"
                            activeDot={{ r: 5 }}
                        />
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="id" interval={0} angle={20} dx={20} dy={30}>
                            <Label value="Recipe ID" offset={0} position="insideBottom" dy={80} />
                        </XAxis>

                        <YAxis
                            label={{
                                value: "Cooking Time (minutes)",
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
            ) : ''}
        </div>
    );
};

export default RecipeChart;