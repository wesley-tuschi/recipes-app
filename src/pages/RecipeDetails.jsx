import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAPI, fetchRecipes } from '../services/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import './styles/RecipeDetails.css';

function RecipesDetails() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [copy, setCopy] = useState('');
  const inha = location.pathname.includes('meals') ? 'Meal' : 'Drink';
  const inhaFetch = location.pathname.includes('meals') ? 'Drink' : 'Meal';
  const verifyType = location.pathname.includes('meals');

  useEffect(() => {
    const API_RECIPE = location.pathname.includes('meals') ? (
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
    ) : (
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
    );
    const API_RECOMENDATION = location.pathname.includes('meals') ? (
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    ) : (
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    async function fetchRecipe() {
      const data = await fetchAPI(location.pathname, API_RECIPE);
      setRecipe(data[0]);
    }
    fetchRecipe();

    async function fetchRecomendation() {
      const data = await fetchRecipes(location.pathname, API_RECOMENDATION);
      setRecomendation(data[`${inhaFetch.toLowerCase()}s`]);
    }
    fetchRecomendation();
  }, []);

  const videoURL = recipe.strYoutube ? recipe.strYoutube : 'https://www.youtube.com/watch?v=0LwcvjNJTuM';
  const videoId = videoURL.match(/v=([^&]+)/)[1];

  const verifyStorageDone = () => {
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    return (getStorage && getStorage.doneDate !== null);
  };

  const verifyStorageProgress = () => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return (getStorage && getStorage.drinks) || (getStorage && getStorage.meals !== null);
  };

  const copyToClipboard = () => {
    if (location.pathname.includes('meals')) {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${params.id}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${params.id}`);
    }
    setCopy('Link copied!');
  };

  const saveFavorite = () => {
    const favorite = {
      id: params.id,
      type: (verifyType ? 'meal' : 'drink'),
      nationality: (verifyType ? recipe.strArea : ''),
      category: recipe.strCategory,
      alcoholicOrNot: (location.pathname.includes('drinks') ? recipe.strAlcoholic : ''),
      name: (verifyType ? recipe.strMeal : recipe.strDrink),
      image: (verifyType ? recipe.strMealThumb : recipe.strDrinkThumb),
    };

    if (localStorage.favoriteRecipes) {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoriteAtt = [...favoriteArray, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteAtt));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
    }
  };
  const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isFavorite = storageFavorite && (
    storageFavorite.some((favorite) => favorite.id === params.id)
  );
  // console.log(isFavorite);

  return (
    <main className="main-details">
      <h2 data-testid="recipe-title">
        { recipe[`str${inha}`] }
      </h2>

      <h3 data-testid="recipe-category">
        { verifyType ? recipe.strCategory : recipe.strAlcoholic }
      </h3>

      <button
        onClick={ copyToClipboard }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share button" />
      </button>
      {copy && <p>{ copy }</p>}

      <button
        onClick={ saveFavorite }
      >
        { isFavorite ? (
          <img data-testid="favorite-btn" src={ blackHeartIcon } alt=" favorite button" />
        ) : (
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt=" favorite button" />
        )}
      </button>

      <br />

      <img
        data-testid="recipe-photo"
        src={ recipe[`str${inha}Thumb`] }
        alt="thumb"
        width="300px"
      />

      <ul>
        {
          Array.from({ length: 20 }).map((_, index) => {
            const ingredient = recipe[`strIngredient${index + 1}`];
            const weight = recipe[`strMeasure${index + 1}`];
            if (ingredient && ingredient.trim()) {
              return (
                <li
                  key={ `ingredient-${index}` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                  {' '}
                  {(weight && weight.trim()) && `- ${weight}`}
                </li>
              );
            }
            return null;
          })
        }
      </ul>

      <p
        style={ { whiteSpace: 'pre-line' } }
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>

      {
        location.pathname.includes('meals') && (
          <iframe
            title={ videoId }
            data-testid="video"
            src={ `https://www.youtube.com/embed/${videoId}` }
          />
        )
      }
      <br />
      <div className="recom-container">
        {
          recomendation.map((recom, index) => {
            const FIVE = 5;
            if (index <= FIVE) {
              return (
                <div
                  key={ recom[`str${inhaFetch}Thumb`] }
                  className="recom-img-container"
                >
                  <img
                    className="recom-img"
                    src={ recom[`str${inhaFetch}Thumb`] }
                    data-testid={ `${index}-recommendation-card` }
                    alt="thumb"
                  />
                  <h5
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {recom[`str${inhaFetch}`]}
                  </h5>
                </div>
              );
            }
            return null;
          })
        }
      </div>

      {
        !verifyStorageDone()
          && (
            <button
              data-testid="start-recipe-btn"
              className="btn-recipe-detail"
              onClick={ () => {
                history.push(`${location.pathname}/in-progress`);
              } }
            >
              { !verifyStorageProgress() ? 'Start recipe' : 'Continue Recipe'}
            </button>
          )
      }

    </main>
  );
}

export default RecipesDetails;
