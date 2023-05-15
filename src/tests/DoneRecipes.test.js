import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';

const TEST_DRINK = 'Test Drink';
const FILTER_BY_ALL_BTN = 'filter-by-all-btn';
const FILTER_BY_MEAL_BTN = 'filter-by-meal-btn';
const FILTER_BY_DRINK_BTN = 'filter-by-drink-btn';
const ZERO_HORIZONTAL_NAME = '0-horizontal-name';
const ONE_HORIZONTAL_NAME = '1-horizontal-name';

describe('Test DoneRecipes component', () => {
  const mockDoneRecipes = [
    {
      id: '123',
      name: 'Test Meal',
      type: 'meal',
      image: 'test_image.jpg',
      nationality: 'Test',
      category: 'Test',
      doneDate: '22/04/2023',
      tags: ['test'],
    },
    {
      id: '456',
      name: TEST_DRINK,
      type: 'drink',
      image: 'test_image.jpg',
      alcoholicOrNot: 'Non-alcoholic',
      doneDate: '22/04/2023',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    global.navigator.clipboard = { writeText: jest.fn() };
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders DoneRecipes component with all recipes', async () => {
    render(<Router history={ createMemoryHistory() }><DoneRecipes /></Router>);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    expect(screen.getByTestId(FILTER_BY_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_MEAL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_DRINK_BTN)).toBeInTheDocument();

    expect(screen.getByTestId(ZERO_HORIZONTAL_NAME)).toHaveTextContent('Test Meal');
    expect(screen.getByTestId(ONE_HORIZONTAL_NAME)).toHaveTextContent(TEST_DRINK);
  });

  test('filtering by meal type', async () => {
    render(<Router history={ createMemoryHistory() }><DoneRecipes /></Router>);

    fireEvent.click(screen.getByTestId(FILTER_BY_MEAL_BTN));

    expect(screen.getByTestId(ZERO_HORIZONTAL_NAME)).toHaveTextContent('Test Meal');
    expect(screen.queryByTestId(ONE_HORIZONTAL_NAME)).not.toBeInTheDocument();
  });

  test('filtering by drink type', async () => {
    render(<Router history={ createMemoryHistory() }><DoneRecipes /></Router>);

    fireEvent.click(screen.getByTestId(FILTER_BY_DRINK_BTN));

    expect(screen.getByTestId(ZERO_HORIZONTAL_NAME)).toHaveTextContent(TEST_DRINK);
    expect(screen.queryByTestId(ONE_HORIZONTAL_NAME)).not.toBeInTheDocument();
  });

  test('clearing filter shows all recipes again', async () => {
    render(<Router history={ createMemoryHistory() }><DoneRecipes /></Router>);

    fireEvent.click(screen.getByTestId(FILTER_BY_MEAL_BTN));
    fireEvent.click(screen.getByTestId(FILTER_BY_ALL_BTN));

    expect(screen.getByTestId(ZERO_HORIZONTAL_NAME)).toHaveTextContent('Test Meal');
    expect(screen.getByTestId(ONE_HORIZONTAL_NAME)).toHaveTextContent(TEST_DRINK);
  });

  test('clicking on profile icon redirects to profile page', async () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><DoneRecipes /></Router>);

    fireEvent.click(screen.getByTestId('profile-top-btn'));

    expect(history.location.pathname).toBe('/profile');
  });

  test('copy to clipboard functionality', async () => {
    render(
      <Router history={ createMemoryHistory() }>
        <DoneRecipes />

      </Router>,
    );

    fireEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/123');
    expect(screen.getByText('Link copiado!')).toBeInTheDocument();
  });

  test('clicking on recipe redirects to recipe details', async () => {
    const history = createMemoryHistory();
    render(<Router history={ history }><DoneRecipes /></Router>);

    fireEvent.click(screen.getByTestId(ZERO_HORIZONTAL_NAME));

    expect(history.location.pathname).toBe('/meals/123');
  });

  test('renders DoneRecipes component with no recipes', async () => {
    localStorage.clear();

    render(<Router history={ createMemoryHistory() }><DoneRecipes /></Router>);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
    expect(screen.getByTestId(FILTER_BY_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_MEAL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_DRINK_BTN)).toBeInTheDocument();

    expect(screen.queryByTestId(ZERO_HORIZONTAL_NAME)).not.toBeInTheDocument();
    expect(screen.queryByTestId(ONE_HORIZONTAL_NAME)).not.toBeInTheDocument();
  });
});
