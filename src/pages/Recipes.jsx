import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchAPI } from '../services/fetchAPI';

const MAGIC_NUMBER = 12;

function Recipes() {
  const [foodsFilterAPI, setFoodsFilterAPI] = useState(null);
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
      setFoodsFilterAPI(data);
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
        setFoodsFilterAPI(data);
      } else {
        setCurrentCategory(category);
        const endpoint = `${api}/filter.php?c=${category}`;
        const data = await fetchAPI(page, endpoint);
        setFoodsFilterAPI(data);
      }
    },
    [api, currentCategory, page],
  );

  const foods = foodsFilterAPI?.slice(0, MAGIC_NUMBER);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleFilter('All') }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleFilter(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      {foods?.map((food, index) => {
        const id = food.idMeal || food.idDrink;
        const route = mealPage ? `/meals/${id}` : `/drinks/${id}`;
        return (
          <Link to={ route } key={ index } data-testid={ `${index}-recipe-card` }>
            <div>
              <img
                src={ food.strDrinkThumb || food.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>{food.strDrink || food.strMeal}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recipes;
