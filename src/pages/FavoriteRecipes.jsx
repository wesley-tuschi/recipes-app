import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import style from './styles/FavoriteRecipes.module.css';
import './styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isFavorite] = useState(true);
  const [copy, setCopy] = useState('');
  const history = useHistory();

  useEffect(() => {
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipe) {
      setFavoriteRecipes(favoriteRecipe);
    }
  }, []);

  const filteredRecipes = favoriteRecipes.filter((recipe) => {
    if (filter === 'All') {
      return true;
    } if (filter === 'Meals') {
      return recipe.type === 'meal';
    }
    return recipe.type === 'drink';
  });

  const filterMeals = () => setFilter('Meals');
  const filterDrinks = () => setFilter('Drinks');
  const clearFilter = () => setFilter('All');

  const copyToClipboard = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);

    setCopy('Link copied!');
  };

  const removeFavorite = (id) => {
    const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavorites = favoriteArray.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavoriteRecipes(updatedFavorites);
  };

  return (
    <div className="favorite-container">
      <header>
        <button onClick={ () => history.push('/profile') }>
          <img
            className="favorite-icon-favorite"
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        <h2 className="h2-favorite-title" data-testid="page-title">Favorite Recipes</h2>
        <button
          className="btn-favorite-all"
          onClick={ clearFilter }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          className="btn-favorite-meals"
          onClick={ filterMeals }
          data-testid="filter-by-meal-btn"
        >
          Meals

        </button>
        <button
          className="btn-favorite-drinks"
          onClick={ filterDrinks }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>

      </header>
      <section>
        <ul>
          {filteredRecipes?.map((recipe, index) => (recipe.type === 'drink' ? (
            <li key={ recipe.name }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  className={ style.imgCard }
                  alt="meal img"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}

              </span>
              <button
                type="button"
                onClick={ () => copyToClipboard(recipe.type, recipe.id) }
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share button"
                />
              </button>
              {copy && <p>{ copy }</p>}
              <button
                type="button"
                onClick={ () => removeFavorite(recipe.id) }
              >
                <img
                  src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt=" favorite button"
                />

              </button>
            </li>
          )
            : (
              <li key={ recipe.name }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    className={ style.imgCard }
                    alt="meal img"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                {console.log(index)}
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </span>
                <button
                  type="button"
                  onClick={ () => copyToClipboard(recipe.type, recipe.id) }
                >
                  <img
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share button"
                  />
                </button>
                {copy && <p>{ copy }</p>}
                <button
                  type="button"
                  onClick={ () => removeFavorite(recipe.id) }
                >
                  <img
                    src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt=" favorite button"
                  />

                </button>
              </li>
            )))}
        </ul>
      </section>
    </div>
  );
}

export default FavoriteRecipes;
