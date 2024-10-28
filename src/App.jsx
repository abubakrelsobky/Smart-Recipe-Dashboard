import { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import RecipeChart from './components/RecipeChart';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    maxCarbs: null,
    searchInput: ''
  });

  const updateFilter = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? '' : value
    }));
  };

  const applyFilters = async () => {
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

    if (filters.cuisine) url += `&cuisine=${filters.cuisine}`;
    if (filters.diet) url += `&diet=${filters.diet}`;
    if (filters.maxCarbs) url += `&maxCarbs=${filters.maxCarbs}`;

    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    setList(json);

    if (filters.searchInput) {
      const filtered = json.results.filter(item =>
        item.title.toLowerCase().includes(filters.searchInput.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(json.results);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const searchItems = (inputString) => {
    updateFilter('searchInput', inputString);
    if (inputString && list) {
      const filtered = list.results.filter(item =>
        item.title.toLowerCase().includes(inputString.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  const FilterButton = ({ filterType, value, label }) => (
    <button className="filter-button" onClick={() => updateFilter(filterType, value)}>
      {label} {filters[filterType] === value ? '✓' : ''}
    </button>
  );

  // Extract ids from data to supply it as prop to RecipeChart component
  const getRecipeIds = () => {
    const data = filteredResults.length > 0 ? filteredResults : (list ? list.results : []);
    return data.map(recipe => recipe.id);
  }; 

  return (
    <div className="whole-page">
      <h1>Recipe Dashboard</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
        value={filters.searchInput}
      />

      <FilterButton filterType="cuisine" value="italian" label="Italian Cuisine" />
      <FilterButton filterType="diet" value="vegetarian" label="Vegetarian Diet" />
      <FilterButton filterType="maxCarbs" value={50} label="Low Carb (Max 50g)" />

      <ul>
        {(filteredResults.length > 0 ? filteredResults : (list ? list.results : []))
          .map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipeDetail/${recipe.id}`}>
                <p>{recipe.title} <span>({recipe.id})</span></p>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </li>
          ))
        }
      </ul>

      {/* Always show the count of results */}
      <p>
        {filteredResults.length > 0
          ? `Total Number of Results: ${filteredResults.length}`
          : 'No Results Found'
        }
      </p>
      <RecipeChart recipeIds={getRecipeIds()} />

    </div>
  );
}

export default App;