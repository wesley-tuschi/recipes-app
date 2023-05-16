import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../services/fetchAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesCard from '../components/RecipesCard';
import AppContext from '../context/AppContext';
import './styles/Recipes.css';

function Recipes() {
  const [foodsAPI, setFoodsAPI] = useState(null);
  const { foodsFilterAPI } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const location = useLocation();
  const mealPage = location.pathname === '/meals';
  const page = mealPage ? '/meals' : '/drinks';
  const api = mealPage
    ? 'https://www.themealdb.com/api/json/v1/1'
    : 'https://www.thecocktaildb.com/api/json/v1/1';

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      const endpoint = `${api}/search.php?s=`;
      const data = await fetchAPI(page, endpoint);
      setFoodsAPI(data);
    };
    fetchInitialRecipes();
  }, [api, page]);

  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint = `${api}/list.php?c=list`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const FIVE = 5;
      setCategories(data.meals ? data.meals.slice(0, FIVE) : data.drinks.slice(0, FIVE));
    };
    fetchCategories();
  }, [api]);

  const handleFilter = useCallback(
    async (category) => {
      if (category === currentCategory || category === 'All') {
        setCurrentCategory('');
        const endpoint = `${api}/search.php?s=`;
        const data = await fetchAPI(page, endpoint);
        setFoodsAPI(data);
      } else {
        setCurrentCategory(category);
        const endpoint = `${api}/filter.php?c=${category}`;
        const data = await fetchAPI(page, endpoint);
        setFoodsAPI(data);
      }
    },
    [api, currentCategory, page],
  );

  return (
    <div className="searchbar-container">

      <Header />
      <SearchBar />
      <div className="search-bttns-container">
        <button
          className="search-bttns-all"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleFilter('All') }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            className="search-bttns-category"
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleFilter(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      <RecipesCard recipes={ foodsFilterAPI.length > 0 ? foodsFilterAPI : foodsAPI } />

      <Footer />

    </div>
  );
}

export default Recipes;
