import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';
import './styles/Profile.css';

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
    <header className="profile-container">
      <button className='profile-done' onClick={ () => history.push('/profile') }>
        <img
          className="profile-icon"
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>
      <h2 className="h2-profile" data-testid="page-title">Profile</h2>
      <div>
        <p className="profile-email" data-testid="profile-email">{ userEmail }</p>
      </div>

      <button
        className="profile-done-btn"
        data-testid="profile-done-btn"
        onClick={ handleButtonClick('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        className="profile-favorite-btn"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        className="profile-logout-btn"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </header>
  );
}

export default Profile;
