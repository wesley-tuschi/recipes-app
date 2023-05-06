import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import Footer from '../components/Footer';

const MEALS_BOTTOM_BTN = 'meals-bottom-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
const FOOTER = 'footer';

describe('Testes do componente Footer', () => {
  it('Verifica se os botões Meals e Drinks estão presentes na tela', () => {
    renderWithRouter(<Footer />, ['/meals']);
    const mealsBtn = screen.getByTestId(MEALS_BOTTOM_BTN);
    const drinksBtn = screen.getByTestId(DRINKS_BOTTOM_BTN);

    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Meals, redireciona para a página de Meals', () => {
    const { history } = renderWithRouter(<Footer />, ['/drinks']);
    const mealsBtn = screen.getByTestId(MEALS_BOTTOM_BTN);
    fireEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });

  it('Verifica se ao clicar no botão Drinks, redireciona para a página de Drinks', () => {
    const { history } = renderWithRouter(<Footer />, ['/meals']);
    const drinksBtn = screen.getByTestId(DRINKS_BOTTOM_BTN);
    fireEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('Verifica se o componente Footer não é exibido em rotas específicas', () => {
    const { container } = renderWithRouter(<Footer />, ['/']);
    expect(container.querySelector(`[data-testid="${FOOTER}"]`)).not.toBeInTheDocument();
  });

  it('Deve exibir o componente Footer na rota "/meals"', () => {
    const { container } = renderWithRouter(<Footer />, ['/meals']);
    expect(container.querySelector(`[data-testid="${FOOTER}"]`)).toBeInTheDocument();
  });

  it('Deve exibir o componente Footer na rota "/drinks"', () => {
    const { container } = renderWithRouter(<Footer />, ['/drinks']);
    expect(container.querySelector(`[data-testid="${FOOTER}"]`)).toBeInTheDocument();
  });
});
