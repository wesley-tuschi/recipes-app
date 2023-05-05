import React, { useState, useEffect } from 'react';

function Login() {
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

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => handleChange(target) }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => handleChange(target) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default Login;
