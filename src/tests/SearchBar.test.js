import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './services/renderWithRouter';
import SearchProvider from '../context/SearchProvider';
import App from '../App';
import { failMock } from './services/mockAPI';

const INPUT_EMAIL = 'teste@gmail.com';
const INPUT_PASSWORD = '12345678';
const DATA_TEST_EMAIL = 'email-input';
const DATA_TEST_PASSWORD = 'password-input';
const DATA_TEST_BTN = 'login-submit-btn';

describe('search bar tests', () => {
  it('renders filter radio buttons and updates filter value', () => {
    renderWithRouter(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>,
    );
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(ingredientRadio).not.toBeChecked();
  });
  it('filter by name', async () => {
    renderWithRouter(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>,
    );

    const nameRadio = screen.getByTestId('name-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');

    expect(nameRadio).toBeInTheDocument();

    userEvent.click(nameRadio);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());
  });
  it('filter fail', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(failMock),
    }));
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    userEvent.click(btnEnter);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');
    const iconSearch = screen.getByRole('img', { name: /search icon/i });
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(ingredientRadio);

    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(btnSearch);
    expect(fetchSpy).toHaveBeenCalled();
    expect(global.Error);
  });
  it('filter by first letter with more one letter', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    userEvent.click(btnEnter);

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');
    const iconSearch = screen.getByRole('img', { name: /search icon/i });
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(firstLetterRadio);

    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.click(btnSearch);
    expect(global.Error);
  });
  it('filter by first letter', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    userEvent.click(btnEnter);

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');
    const iconSearch = screen.getByRole('img', { name: /search icon/i });
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'a');
    userEvent.click(firstLetterRadio);

    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.click(btnSearch);
    await waitFor(() => expect(screen.findByRole('img')).not.toBeInTheDocument());
  });
});
