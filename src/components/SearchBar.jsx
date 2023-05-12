import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchAPI } from '../services/fetchAPI';
// import RecipesCard from './RecipesCard';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const {
    inputSearch,
    foodsFilterAPI,
    setFoodsFilterAPI } = useContext(AppContext);

  const history = useHistory();
  const location = useLocation();
  const mealPage = location.pathname === '/meals';
  const page = mealPage ? '/meals' : '/drinks';
  const api = mealPage
    ? 'https://www.themealdb.com/api/json/v1/1'
    : 'https://www.thecocktaildb.com/api/json/v1/1';

  const handleSearch = useCallback(async () => {
    let endpoint;
    if (filter === 'Ingredient') {
      endpoint = `${api}/filter.php?i=${inputSearch}`;
    } else if (filter === 'Name') {
      endpoint = `${api}/search.php?s=${inputSearch}`;
    } else if (inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    } else {
      endpoint = `${api}/search.php?f=${inputSearch}`;
    }

    const data = await fetchAPI(page, endpoint);
    if (!data.length) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setFoodsFilterAPI([]);
    }

    if (data.length === 1) {
      history.push(`${page}/${page.includes('meal') ? data[0].idMeal : data[0].idDrink}`);
    }
    setFoodsFilterAPI(data);
  }, [filter, inputSearch, setFoodsFilterAPI, history, api, page]);

  useEffect(() => {
    console.log(foodsFilterAPI);
  });

  return (
    <div>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        name="filter"
        value="Ingredient"
        onChange={ ({ target }) => setFilter(target.value) }
      />
      <input
        type="radio"
        data-testid="name-search-radio"
        name="filter"
        value="Name"
        onChange={ ({ target }) => setFilter(target.value) }
      />
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        name="filter"
        value="First letter"
        onChange={ ({ target }) => setFilter(target.value) }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
