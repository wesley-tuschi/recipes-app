import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          ENTER
        </button>
      </form>
    </div>
  );
}
