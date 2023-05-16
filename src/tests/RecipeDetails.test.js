import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const expectedFavoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
];

const expectedFavoritesDrinks = [
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

const eventClick = (variavel) => userEvent.click(variavel);

const renderMeals = (route) => renderWithRouter(<App />, [route]);
const routeMeals = '/meals/52771';
const routeDrinks = '/drinks/15997';

const favoriteTestId = 'favorite-btn';
const startRecipeTestId = 'start-recipe-btn';

describe('Testando a tela de Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testando se renderiza todos os itens', async () => {
    renderMeals(routeMeals);
    const title = await waitFor(() => screen.getByRole('heading', { name: /spicy arrabiata penne/i }));
    expect(title).toBeInTheDocument();
    // screen.getByText("Side")
    // await screen.findByText("Lentils")
  });

  it('Testa se ao clicar em favorites mude para blackheart"', async () => {
    const { history } = renderMeals(routeMeals);
    waitFor(() => screen.getByTestId(favoriteTestId));
    const favoriteImg = screen.getByTestId(favoriteTestId);
    eventClick(favoriteImg);
    expect(favoriteImg.src).toContain('blackHeartIcon');
    eventClick(favoriteImg);
    expect(favoriteImg.src).toContain('whiteHeartIcon');

    history.push(routeDrinks);
    eventClick(favoriteImg);
    expect(favoriteImg.src).toContain('blackHeartIcon');
    expect(history.location.pathname).toBe(routeDrinks);
  });

  it('Testa se ao clicar em share na rota drinks, apareça o texto "link copied!"', async () => {
    navigator.clipboard = {
      writeText: () => {},
    };
    renderWithRouter(<App />, [routeDrinks]);
    await waitFor(() => screen.getByTestId('share-btn'));
    const shareBtn = screen.getByTestId('share-btn');
    eventClick(shareBtn);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });

  it('Testa se ao clicar em share na rota meals, apareça o texto "link copied!"', async () => {
    navigator.clipboard = {
      writeText: () => {},
    };
    renderMeals(routeMeals);
    await waitFor(() => screen.getByTestId('share-btn'));
    const shareBtn = screen.getByTestId('share-btn');
    eventClick(shareBtn);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });

  it('Verifica se o botão Start Recipe está no documento quando ja tiver a receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52771' }]));
    renderMeals(routeMeals);
    const btnStart = screen.queryByTestId(startRecipeTestId);
    expect(btnStart).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão favorite na rota meals, vai para o localStorage', async () => {
    renderMeals(routeMeals);
    const favoriteBtn = await waitFor(() => screen.getByTestId(favoriteTestId));
    const title = await waitFor(() => screen.getByRole('heading', { name: /spicy arrabiata penne/i }));
    expect(title).toBeInTheDocument();
    eventClick(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);
  });

  it('Verifica se ao clicar no botão favorite na rota drinks, vai para o localStorage', async () => {
    renderWithRouter(<App />, ['/drinks/178319']);
    const favoriteBtn = await waitFor(() => screen.getByTestId(favoriteTestId));
    const title = await waitFor(() => screen.getByRole('heading', { name: /aquamarine/i }));
    expect(title).toBeInTheDocument();
    eventClick(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual(expectedFavoritesDrinks);
  });

  it('Verifica se ao renderizar ele verifica o favorito no localStorage', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(expectedFavoriteRecipes));
    renderMeals(routeMeals);
    const btnFavorite = screen.queryByTestId('favorite-btn');
    expect(btnFavorite.src).toContain('blackHeartIcon');
  });

  it('Verifica se ao clicar no botão Start Recipe é redirecionado para rota in-progress', async () => {
    const { history } = renderMeals(routeMeals);
    const btnStart = await screen.findByTestId(startRecipeTestId);
    expect(btnStart).toBeInTheDocument();
    eventClick(btnStart);
    expect(history.location.pathname).toBe(`${routeMeals}/in-progress`);
  });

  it('Verifica se o botão muda para continue recipe', async () => {
    const { history } = renderMeals(routeMeals);
    const btnStart = await screen.findByTestId(startRecipeTestId);
    expect(btnStart).toBeInTheDocument();
    eventClick(btnStart);
    expect(history.location.pathname).toBe(`${routeMeals}/in-progress`);
    const checkbox = await screen.findByTestId('0-ingredient-step');
    eventClick(checkbox);

    history.push('/meals/52771');
    expect(history.location.pathname).toBe(routeMeals);
    const btnContinue = await screen.findByTestId(startRecipeTestId);
    expect(btnContinue).toHaveTextContent('Continue Recipe');
  });
});
