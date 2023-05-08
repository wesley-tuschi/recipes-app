import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <section>
      <div>
        <p data-testid="profile-email">{ email }</p>
      </div>

      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
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
    </section>
  );
}

export default Profile;
