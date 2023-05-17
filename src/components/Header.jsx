import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import logo from '../images/logo.svg';
import drinkIcon from '../images/drinkIconHeader.svg';
import mealIcon from '../images/mealIconHeader.svg';
import AppContext from '../context/AppContext';

import '../pages/styles/Header.css';

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { inputSearch, setInputSearch } = useContext(AppContext);

  const displaySearchIcon = () => {
    const pagesWithSearch = ['/meals', '/drinks'];

    if (pagesWithSearch.includes(location.pathname)) {
      return (
        <button
          className="search-top"
          onClick={ () => setIsSearchVisible(!isSearchVisible) }
        >
          <img
            className="search-top-btn"
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
    return null;
  };

  const getPageTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const getPageIcon = () => {
    switch (location.pathname) {
    case '/meals':
      return mealIcon;
    case '/drinks':
      return drinkIcon;
    default:
      return null;
    }
  };

  const shouldDisplayHeader = () => {
    const routesWithoutHeader = [
      '/',
      '/meals/:id-da-receita',
      '/drinks/:id-da-receita',
      '/meals/:id-da-receita/in-progress',
      '/drinks/:id-da-receita/in-progress',
    ];

    return !routesWithoutHeader.some((path) => new RegExp(`^${path.replace(/:\w+-\w+/g, '\\d+')}$`).test(location.pathname));
  };

  return shouldDisplayHeader() ? (
    <header className="header">
      <div className="header-logo">
        <img
          src={ logo }
          alt="logo Icon"
        />
      </div>
      <div className="header-title">
        {getPageTitle() && <h1 data-testid="page-title">{getPageTitle()}</h1>}
        <img
          src={ getPageIcon() }
          alt="page Icon"
        />
      </div>
      <div className="profile-search-icons">
        <button className="profile-top" onClick={ () => history.push('/profile') }>
          <img
            className="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        {displaySearchIcon()}
        {isSearchVisible && (
          <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ ({ target }) => setInputSearch(target.value) }
          />)}
      </div>
    </header>
  ) : null;
}

export default Header;
