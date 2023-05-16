import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles/RecipesCard.css';

const MAX_ITEMS = 12;

function RecipesCard({ recipes }) {
  const foods = recipes?.slice(0, MAX_ITEMS);
  return (
    <div className="recipeCards-container">
      {foods?.map((food, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
          className="card-container"
        >
          <Link
            to={ food.idDrink ? `/drinks/${food.idDrink}` : `/meals/${food.idMeal}` }
          >
            <img
              src={ food.strDrinkThumb || food.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt=""
              className="recipes-card-img"
            />
            <p
              className="recipes-card-name"
              data-testid={ `${index}-card-name` }
            >
              {food.strDrink || food.strMeal}

            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

RecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipesCard;
