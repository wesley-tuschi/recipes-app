import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import style from './styles/DoneRecipes.module.css';
import './styles/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [copy, setCopy] = useState('');
  const history = useHistory();

  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe) {
      setDoneRecipes(doneRecipe);
    }
  }, []);

  const filteredRecipes = doneRecipes.filter((recipe) => {
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

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);

    setCopy('Link copied!');
  };

  return (
    <div className="doneRecipes-container">
      <header>
        <button onClick={ () => history.push('/profile') }>
          <img
            className="profile-icon-done"
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        <h2 className="title-done" data-testid="page-title">Done Recipes</h2>
        <button
          className="btn-done-all"
          onClick={ clearFilter }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          className="btn-done-meals"
          onClick={ filterMeals }
          data-testid="filter-by-meal-btn"
        >
          Meals

        </button>
        <button
          className="btn-done-drinks"
          onClick={ filterDrinks }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>

      </header>
      <section className="done-recipes-container">
        <ul>
          {filteredRecipes?.map((recipe, index) => (recipe.type === 'drink' ? (
            <li key={ recipe.name }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  // style={ { width: '200px' } }
                  className={ style.img }
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
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
              <button
                className="btn-done-share"
                type="button"
                onClick={ () => copyToClipboard(recipe.id) }
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share button"
                />
              </button>
              {copy && <p>{ copy }</p>}
            </li>
          )
            : (
              <li key={ recipe.name }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
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
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}

                </p>
                {recipe.tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}

                  </p>
                ))}
                <button
                  type="button"
                  onClick={ () => copyToClipboard(recipe.id) }
                >
                  <img
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share button"
                  />
                </button>
                {copy && <p>{ copy }</p>}
              </li>
            )))}
        </ul>
      </section>
    </div>
  );
}

export default DoneRecipes;
