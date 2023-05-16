import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testes do componente Profile', () => {
  it('Deve redirecionar o usuário para a página "Done Recipes" quando o botão "Done Recipes" for clicado', () => {
    renderWithRouter(<Profile />);

    const doneRecipesButtons = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButtons);
  });

  it('Deve redirecionar o usuário para a página "Favorite Recipes" quando o botão "Favorite Recipes" é clicado', () => {
    renderWithRouter(<Profile />);
    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);
  });

  it('Deve redirecionar o usuário para a página "Login" e limpar o armazenamento local quando o botão "Logout" for clicado', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    renderWithRouter(<Profile />);

    const logoutButtons = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButtons);

    const userEmailElement = await screen.findByTestId('profile-email');
    expect(userEmailElement.textContent).toBe('test@test.com');
    expect(localStorage.getItem('user')).toBeNull();

    localStorage.clear();
  });

  it('Deve exibir o email do usuário', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email1@test.com' }));
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('email1@test.com');
  });

  it('Deve redirecionar para a página de receitas feitas ao clicar em "Done Recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Deve redirecionar para a página de receitas favoritas ao clicar em "Favorite Recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Deve redirecionar para a página de login ao clicar em "Logout"', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email2@test.com' }));
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });

  it('Deve navegar para a página de perfil quando o botão é clicado', () => {
    const { history } = renderWithRouter(<Profile />);

    const profileBttn = screen.getByRole('img', {
      name: /profile icon/i,
    });
    fireEvent.click(profileBttn);

    expect(history.location.pathname).toBe('/profile');
  });
});
