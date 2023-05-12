import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { inputSearch, setInputSearch } = useContext(AppContext);

  const displaySearchIcon = () => {
    const pagesWithSearch = ['/meals', '/drinks'];

    if (pagesWithSearch.includes(location.pathname)) {
      return (
        <button onClick={ () => setIsSearchVisible(!isSearchVisible) }>
          <img
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
    <header>
      <button onClick={ () => history.push('/profile') }>
        <img
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
      {getPageTitle() && <h1 data-testid="page-title">{getPageTitle()}</h1>}
    </header>
  ) : null;
}

export default Header;
