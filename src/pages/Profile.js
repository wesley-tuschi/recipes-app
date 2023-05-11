import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
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
    <section>
      <Header>Profile</Header>
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
    </section>
  );
}

export default Profile;
