import React from 'react';
import PropTypes from 'prop-types';

const MAX_ITEMS = 12;

function RecipesCard({ foodsFilterAPI }) {
  const foods = foodsFilterAPI?.slice(0, MAX_ITEMS);
  return (
    <div>
      {foods?.map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ food.strDrinkThumb || food.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt=""
          />
          <p data-testid={ `${index}-card-name` }>{food.strDrink || food.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

RecipesCard.propTypes = {
  foodsFilterAPI: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipesCard;
