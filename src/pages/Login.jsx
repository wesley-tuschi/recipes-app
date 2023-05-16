import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userLocalStorage } from '../services/setupLocalStorage';
import logoRecipes from '../images/logoRecipes.png';
import logoTomato from '../images/logoTomato.png';
import './styles/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^[0-9a-zA-Z]{7,}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleChange = (target) => {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleClick = () => {
    history.push('/meals');
    userLocalStorage(email);
  };

  return (
    <div>
      <div className="images-container">
        <img className="imgLogotipo" src={ logoRecipes } alt="logotipo" />
        <img className="imgTomate" src={ logoTomato } alt="imagem de tomates" />
      </div>
      <div className="form-login-container">
        <h1 className="login">Login</h1>
        <form className="inputs-login-container">
          <input
            className="input-email"
            type="email"
            placeholder="Email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => handleChange(target) }
          />
          <input
            className="input-password"
            type="password"
            placeholder="Password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => handleChange(target) }
          />
          <button
            className="btn-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
