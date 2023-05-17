import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchAPI } from '../services/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import style from './styles/RecipesProgress.module.css';
import './styles/RecipeInProgress.css';

function RecipeInProgress() {
  const [recipes, setRecipes] = useState([]);
  const [copySucess, setCopySucess] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeId = useParams();
  const history = useHistory();
  const location = useLocation();

  const mealPage = location.pathname;
  const page = mealPage.includes('meals') ? '/meals' : '/drinks';
  let endpoint;
  if (page.includes('meals')) {
    endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId.id}`;
  } else if (page.includes('drinks')) {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId.id}`;
  }

  const copyToClipboard = () => {
    if (page.includes('meals')) {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${recipeId.id}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${recipeId.id}`);
    }
    setCopySucess('Link copied!');
  };

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchAPI(page, endpoint);
      setRecipes(data);
    };
    getRecipes();
  }, [endpoint, page, recipeId.id]);

  useEffect(() => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};
    const recipeType = page.includes('meals') ? 'meals' : 'drinks';
    const recipeInProgress = inProgressRecipes[recipeType] || {};
    const checkedIngredient = recipeInProgress[recipeId.id] || [];
    setCheckedIngredients(checkedIngredient);
  }, [page, recipeId.id]);

  useEffect(() => {
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFav = storageFavorite && (
      storageFavorite.some((favorite) => favorite.id === recipeId.id)
    );
    setIsFavorite(isFav);
  }, [recipeId.id]);

  useEffect(() => {
    const checkAllIngredients = () => {
      if (!recipes.length) {
        return null;
      }
      const ingredientsCount = Object.keys(recipes[0])
        .filter((key) => key
          .includes('strIngredient')
           && typeof recipes[0][key] === 'string'
           && recipes[0][key].trim() !== '').length;

      const allChecked = checkedIngredients.length === ingredientsCount
        && checkedIngredients.every(Boolean);

      setIsAllChecked(allChecked);
    };
    checkAllIngredients();
  }, [checkedIngredients, recipes]);

  const handleCheckIngredient = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const recipeType = page.includes('meals') ? 'meals' : 'drinks';
    const recipeInProgress = inProgressRecipes[recipeType] || {};
    recipeInProgress[recipeId.id] = newCheckedIngredients;
    inProgressRecipes[recipeType] = recipeInProgress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const handleFinishRecipe = () => {
    const dateNow = new Date();
    const tagsArray = recipes[0].strTags ? recipes[0].strTags.split(',') : [];
    const tags = tagsArray.map((tag) => (tag));
    const doneRecipe = {
      id: recipes[0].idMeal || recipes[0].idDrink,
      nationality: recipes[0].strArea || '',
      name: recipes[0].strDrink || recipes[0].strMeal,
      category: recipes[0].strCategory,
      image: recipes[0].strDrinkThumb || recipes[0].strMealThumb,
      tags,
      alcoholicOrNot: recipes[0].strAlcoholic || '',
      type: page.includes('meals') ? 'meal' : 'drink',
      doneDate: dateNow.toISOString().split('T')[0],
    };

    const existingDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isRecipeAlreadyDone = existingDoneRecipes
      .some((recipe) => recipe.id === doneRecipe.id);

    if (!isRecipeAlreadyDone) {
      existingDoneRecipes.push(doneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(existingDoneRecipes));
    }

    history.push('/done-recipes');
  };

  const saveFavorite = () => {
    const favorite = {
      id: recipes[0].idMeal || recipes[0].idDrink,
      type: page.includes('meals') ? 'meal' : 'drink',
      nationality: recipes[0].strArea || '',
      category: recipes[0].strCategory,
      alcoholicOrNot: recipes[0].strAlcoholic || '',
      name: recipes[0].strDrink || recipes[0].strMeal,
      image: recipes[0].strDrinkThumb || recipes[0].strMealThumb,
    };

    if (localStorage.favoriteRecipes) {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isSame = favoriteArray.some((item) => item.id === favorite.id);
      const favoriteAtt = [...favoriteArray, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteAtt));
      if (isSame) {
        const updatedFavorites = favoriteArray.filter((item) => item.id !== favorite.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      setIsFavorite(true);
    }
  };

  return (
    <div className="progress-container">
      {recipes.map((recipe) => (
        <div key={ recipe.strDrink || recipe.strMeal }>
          <div className="info-header">
            <img
              className="photo-details"
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt=""
            />

            <div className='container-inside'>
              <h2
                className="title"
                data-testid="recipe-title"
              >
                {recipe.strDrink || recipe.strMeal}

              </h2>
              <h3
                className="h3-container"
                data-testid="recipe-category"
              >
                { recipe.strCategory }

              </h3>
              <div className='btns-header'>
                <button
                  className="btn-share"
                  type="button"
                  data-testid="share-btn"
                  onClick={ copyToClipboard }

                >
                  <img className="shareIcon-progress" src={ shareIcon } alt="share button" />
                </button>
                {copySucess && <p>{copySucess}</p>}
                <button
                  className="btn-fav"
                  type="button"
                  onClick={ () => saveFavorite() }
                >
                  <img
                    className="btn-favorite"
                    src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                    data-testid="favorite-btn"
                    alt=" favorite button"
                  />
                </button>
              </div>
            </div>

          </div>
          
          <h3 className="h3-progress">Ingredients</h3>

          <div className="ingredients-container">
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = recipe[`strIngredient${index + 1}`];
              const isChecked = checkedIngredients[index];

              if (ingredient && ingredient.trim()) {
                return (
                  <label
                    className={ isChecked ? `${style.checked} label-progress` : `${style.unchecked} label-progress` }
                    htmlFor={ index }
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      className='checkbox'
                      type="checkbox"
                      checked={ !!isChecked }
                      id={ index }
                      onChange={ () => handleCheckIngredient(index) }
                    />
                    <p>{ingredient}</p>
                  </label>
                );
              }

              return null;
            })}
          </div>
          <h3 className="h3-progress">Instructions</h3>
          <p className="instructions in" data-testid="instructions">{recipe.strInstructions}</p>
          <button
            className="finish-recipe-btn-progress"
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ !isAllChecked }
            onClick={ handleFinishRecipe }
          >
            Finish Recipe

          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeInProgress;
