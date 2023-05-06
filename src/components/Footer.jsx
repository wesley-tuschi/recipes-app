import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  const history = useHistory();
  const location = useLocation();

  const shouldDisplayFooter = () => {
    const routesWithoutFooter = [
      '/',
      '/meals/:id-da-receita',
      '/drinks/:id-da-receita',
      '/meals/:id-da-receita/in-progress',
      '/drinks/:id-da-receita/in-progress',
      '/done-recipes',
      '/favorite-recipes',
    ];

    return !routesWithoutFooter.some((path) => new RegExp(`^${path.replace(/:\w+-\w+/g, '\\d+')}$`).test(location.pathname));
  };

  return shouldDisplayFooter() ? (
    <footer data-testid="footer" className="footer">
      <button
        onClick={ () => history.push('/meals') }
      >
        <img src={ mealIcon } alt="Meals Icon" data-testid="meals-bottom-btn" />
      </button>
      <button
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Drinks Icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  ) : null;
}

export default Footer;
