import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa a tela de Profile', () => {
  it('Verifica se existe uma tag p com data-testid="profile-email"', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByText(/\{"email":"thuliobrm@hotmail\.com"\}/i);
    expect(email).toBeInTheDocument();
  });

  it('Verifica se existe um botão chamado "Done Recipes" e com data-testid="profile-done-btn"', () => {
    renderWithRouter(<Profile />);
    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnDoneRecipes).toHaveTextContent('Done Recipes');
  });

  it('Verifica se ao clicar em "Logout" a pagina é redirecionada para tela de Login', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar em "Done Recipes" a pagina é redirecionada para tela de done-recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica se ao clicar em "Favorite Recipes" a pagina é redirecionada para tela de favorite-recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
});
