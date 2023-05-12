import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleButtonClick = (path) => () => {
    history.push(path);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <header>
      <button onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>
      <h2 data-testid="page-title">Done Recipes</h2>
      <div>
        <p data-testid="profile-email">{ userEmail }</p>
      </div>

      <button
        data-testid="profile-done-btn"
        onClick={ handleButtonClick('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
    </header>
  );
}

export default DoneRecipes;
