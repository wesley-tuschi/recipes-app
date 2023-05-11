import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/Footer.css';

function Footer() {
  const history = useHistory();

  return (
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
  );
}

export default Footer;
