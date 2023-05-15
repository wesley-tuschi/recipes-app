import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { favoriteRecipesMock } from './services/mockAPI';

const ZERO_HORIZONTAL_IMAGE = '0-horizontal-image';
const ONE_HORIZONTAL_IMAGE = '1-horizontal-image';

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
  global.navigator.clipboard = { writeText: jest.fn() };
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('Testa a página de favoritos', () => {
  it('Verifica se a tela de favoritos é renderizada', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);
    const titleEl = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(titleEl).toBeInTheDocument();
    expect(screen.getByTestId(ZERO_HORIZONTAL_IMAGE)).toBeInTheDocument();
  });
  it('Verifica se o filtro All esta funcionando corretamente', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByTestId(ZERO_HORIZONTAL_IMAGE)).toBeInTheDocument();
    expect(screen.queryByTestId(ONE_HORIZONTAL_IMAGE)).toBeInTheDocument();
  });
  it('Verifica se o filtro meals esta funcionando corretamente', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    expect(screen.getByTestId(ZERO_HORIZONTAL_IMAGE)).toBeInTheDocument();
    expect(screen.queryByTestId(ONE_HORIZONTAL_IMAGE)).not.toBeInTheDocument();
  });
  it('Verifica se o filtro drink esta funcionando corretamente', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    expect(screen.getByTestId(ZERO_HORIZONTAL_IMAGE)).toBeInTheDocument();
    expect(screen.queryByTestId(ONE_HORIZONTAL_IMAGE)).not.toBeInTheDocument();
  });
  it('Verifica se é redirecionado para o perfil ao clicar no ícone de perfil', async () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><FavoriteRecipes /></Router>);
    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se é copiado o link da receita no botao compartilhar', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);

    fireEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52893');
  });
  it('Verifica se é removido do array e da tela ao desfavoritar comida', async () => {
    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);

    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(localStorage.getItem('favoriteRecipes')).toEqual('[]');
    expect(screen.queryByTestId(ZERO_HORIZONTAL_IMAGE)).not.toBeInTheDocument();
  });
  test('should copy recipe link to clipboard', async () => {
    const mockedCopy = jest.fn();
    global.navigator.clipboard = {
      writeText: mockedCopy,
    };

    const mockRecipes = [{
      id: '123',
      name: 'Mock Recipe',
      type: 'drink',
      alcoholicOrNot: 'Alcoholic',
      image: 'mockimage.jpg',
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

    render(<Router history={ createMemoryHistory() }><FavoriteRecipes /></Router>);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);

    expect(mockedCopy).toHaveBeenCalledWith('http://localhost:3000/drinks/123');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
