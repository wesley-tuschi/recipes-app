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
      <header className='header-container'>
        <button className='profile-done' onClick={ () => history.push('/profile') }>
          <img
            className="profile-icon-done"
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        <h2 className="title-done" data-testid="page-title">Done Recipes</h2>
        <div className='btns-done'>
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
        </div>
      </header>
      <section className="done-recipes-container">
        {filteredRecipes?.map((recipe, index) => (recipe.type === 'drink' ? (
          <div className='container-done' key={ recipe.name }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                className='img-done'
                alt="meal img"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className='done-details'>
              <Link style={{ textDecoration: 'none' }} to={ `${recipe.type}s/${recipe.id}` }>
                <p className='title-done-details' data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              <span
                className='details-done'
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </span>
              <p
                className='details-done'
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
            </div>
            <button
              className="share-done"
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
          </div>
        )
          : (
            <div className='container-done' key={ recipe.name }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className='img-done'
                  src={ recipe.image }
                  alt="meal img"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className='done-details'>
                <Link style={{ textDecoration: 'none' }}  to={ `${recipe.type}s/${recipe.id}` }>
                  <p className='title-done-details' data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <span
                  className='details-done'
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </span>
                <p
                  className='details-done'
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                {recipe.tags.map((tag) => (
                  <p
                    className='details-done'
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <button
                className='share-done'
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
            </div>
          )))}
      </section>
    </div>
  );
}

export default DoneRecipes;
