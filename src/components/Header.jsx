import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ showSearchIcon = false, children }) {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <header>
      <button
        type="button"
        onClick={ handleProfileClick }
      >
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </button>
      {showSearchIcon && (
        <button
          type="button"
          onClick={ toggleSearchBar }
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {isSearchBarVisible && (
        <input
          type="text"
          data-testid="search-input"
        />
      )}
      <h1
        data-testid="page-title"
      >
        {children}
      </h1>
    </header>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Header;
