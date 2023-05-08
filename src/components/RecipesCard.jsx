// import React from 'react';
// import PropTypes from 'prop-types';

// const MAGIC_NUMBER = 12;

// function RecipesCard({ foodsFilterAPI }) {
//   const foods = foodsFilterAPI?.slice(0, MAGIC_NUMBER);
//   return (
//     <div>
//       {foods?.map((food, index) => (
//         <div data-testid={ `${index}-recipe-card` } key={ index }>
//           <img
//             src={ food.strDrinkThumb || food.strMealThumb }
//             data-testid={ `${index}-card-img` }
//             alt=""
//           />
//           <p data-testid={ `${index}-card-name` }>{food.strDrink || food.strMeal}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// RecipesCard.propTypes = {
//   foodsFilterAPI: PropTypes.arrayOf().isRequired,
// };
// export default RecipesCard;
