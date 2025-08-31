import { useState, useEffect } from "react";
import "./App.css";
import RecipeChart from "./components/RecipeChart";
import RecipeCard from "./components/RecipeCard";

// No API key needed for TheMealDB!

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    category: "",
    searchInput: "",
  });

  const updateFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? "" : value,
    }));
  };

  const applyFilters = async () => {
    // TheMealDB doesn't support multiple filter parameters in a single call
    const activeFilters = [];
    if (filters.area) activeFilters.push({ type: "area", value: filters.area });
    if (filters.category)
      activeFilters.push({ type: "category", value: filters.category });

    let url = "";
    let allResults = [];

    // Get results based on filters (not search)
    if (activeFilters.length === 1) {
      // Single filter - use direct API call
      const filter = activeFilters[0];
      if (filter.type === "area") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
          filter.value
        )}`;
      } else if (filter.type === "category") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          filter.value
        )}`;
      }
    } else if (activeFilters.length > 1) {
      // Multiple filters - fetch each separately and find intersection
      const filterResults = await Promise.all(
        activeFilters.map(async (filter) => {
          let filterUrl = "";
          if (filter.type === "area") {
            filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
              filter.value
            )}`;
          } else if (filter.type === "category") {
            filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              filter.value
            )}`;
          }

          const response = await fetch(filterUrl);
          const json = await response.json();
          return json.meals || [];
        })
      );

      // Find intersection of all filter results
      if (filterResults.length > 0) {
        allResults = filterResults[0].filter((meal1) =>
          filterResults
            .slice(1)
            .every((filterResult) =>
              filterResult.some((meal2) => meal1.idMeal === meal2.idMeal)
            )
        );
      }

      setList({ meals: allResults });

      // Now apply search filter on these results
      if (filters.searchInput && filters.searchInput.trim() !== "") {
        const searchFiltered = allResults.filter((meal) =>
          meal.strMeal.toLowerCase().includes(filters.searchInput.toLowerCase())
        );
        setFilteredResults(searchFiltered);
      } else {
        setFilteredResults(allResults);
      }
      return;
    } else if (filters.searchInput && filters.searchInput.trim() !== "") {
      // Only search, no filters
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        filters.searchInput
      )}`;
    } else {
      // No filters and no search - fetch all or default meals
      url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    }

    if (url) {
      const response = await fetch(url);
      const json = await response.json();

      setList(json);

      // Apply search filter if we have search input
      if (
        filters.searchInput &&
        filters.searchInput.trim() !== "" &&
        activeFilters.length > 0
      ) {
        // We have both filters and search
        // Filter the results by search term
        const searchFiltered = (json.meals || []).filter((meal) =>
          meal.strMeal.toLowerCase().includes(filters.searchInput.toLowerCase())
        );
        setFilteredResults(searchFiltered);
      } else {
        setFilteredResults(json.meals || []);
      }
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const searchItems = (inputString) => {
    updateFilter("searchInput", inputString);
  };

  const FilterButton = ({ filterType, value, label }) => (
    <button
      className="filter-button"
      onClick={() => updateFilter(filterType, value)}
    >
      {label} {filters[filterType] === value ? "✓" : ""}
    </button>
  );

  // Extract recipe data for chart
  const getRecipeData = () => {
    return filteredResults.length > 0 ? filteredResults : [];
  };

  return (
    <div className="whole-page">
      <h1>Recipe Dashboard (TheMealDB)</h1>

      <div className="search-and-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes..."
          onChange={(e) => searchItems(e.target.value)}
          value={filters.searchInput}
        />

        <div className="filter-buttons">
          <FilterButton
            filterType="area"
            value="Italian"
            label="Italian Cuisine"
          />
          <FilterButton
            filterType="category"
            value="Vegetarian"
            label="Vegetarian"
          />
          <FilterButton filterType="category" value="Chicken" label="Chicken" />
        </div>
      </div>

      <ul className="recipe-list">
        {(filteredResults.length > 0 ? filteredResults : []).map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </ul>

      {/* Always show the count of results */}
      <p>
        {filteredResults.length > 0
          ? `Total Number of Results: ${filteredResults.length}`
          : "No Results Found"}
      </p>
      <RecipeChart recipes={getRecipeData()} />
    </div>
  );
}

export default App;
