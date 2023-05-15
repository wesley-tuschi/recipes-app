import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

const RECIPE_CARD = '0-recipe-card';
const CARD_NAME = '0-card-name';

describe('Testando a página de recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  it('Testa se clicar em All espera que o primeiro elemento seja "corba" ', async () => {
    renderWithRouter(<App />, ['/meals']);
    await waitFor(() => screen.getByTestId(RECIPE_CARD));
    const allbtn = screen.getByTestId('All-category-filter');
    userEvent.click(allbtn);

    const firstRecipeName = screen.getByTestId(CARD_NAME);

    expect(firstRecipeName.innerHTML).toBe('Corba');
  });

  it('Testa se clicar duas vezes em "Beef" espera que o primeiro elemento seja "corba" ', async () => {
    renderWithRouter(<App />, ['/meals']);
    await waitFor(() => screen.getByTestId(RECIPE_CARD));
    const beefbtn = screen.getByTestId('Beef-category-filter');
    userEvent.click(beefbtn);
    userEvent.click(beefbtn);

    const firstRecipeName = screen.getByTestId(CARD_NAME);

    expect(firstRecipeName.innerHTML).toBe('Corba');
  });

  it('Testa se clicar duas vezes em "Shake" espera que o primeiro elemento seja "GG" ', async () => {
    renderWithRouter(<App />, ['/drinks']);
    await waitFor(() => screen.getByTestId(RECIPE_CARD));
    const shakebtn = screen.getByTestId('Shake-category-filter');
    userEvent.click(shakebtn);
    userEvent.click(shakebtn);

    const firstRecipeName = screen.getByTestId(CARD_NAME);

    expect(firstRecipeName.innerHTML).toBe('GG');
  });
});
