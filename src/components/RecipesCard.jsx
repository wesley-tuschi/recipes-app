import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MAX_ITEMS = 12;

function RecipesCard({ recipes }) {
  const foods = recipes?.slice(0, MAX_ITEMS);
  return (
    <div>
      {foods?.map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <Link
            to={ food.idDrink ? `/drinks/${food.idDrink}` : `/meals/${food.idMeal}` }
          >
            <img
              src={ food.strDrinkThumb || food.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>{food.strDrink || food.strMeal}</p>
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
