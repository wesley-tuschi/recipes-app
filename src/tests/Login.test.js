import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

const INPUT_EMAIL = 'teste@gmail.com';
const INPUT_PASSWORD = '12345678';
const DATA_TEST_EMAIL = 'email-input';
const DATA_TEST_PASSWORD = 'password-input';
const DATA_TEST_BTN = 'login-submit-btn';

describe('Testa a tela de Login', () => {
  it('Verifica se existe um input com data-testid="email-input"', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    expect(inputEmail).toBeInTheDocument();
  });
  it('Verifica se existe um input com data-testid="password-input"', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
  });
  it('Verifica se existe um botão chamado "Enter" e com data-testid="login-submit-btn"', () => {
    renderWithRouter(<App />);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    expect(btnEnter).toBeInTheDocument();
    expect(btnEnter).toHaveTextContent('ENTER');
  });
  it('Verifica se é possível inserir email e senha', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    expect(inputEmail).toHaveTextContent('');
    expect(inputPassword).toHaveTextContent('');
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    expect(inputEmail).toHaveValue(INPUT_EMAIL);
    expect(inputPassword).toHaveValue(INPUT_PASSWORD);
  });
  it('Verifica se o botão é habilitado ao inserir email e senha validos', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    expect(btnEnter).toBeEnabled();
  });
  it('Verifica se ao clicar em "Enter" a pagina é redirecionada para tela principal de receitas', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(DATA_TEST_EMAIL);
    const inputPassword = screen.getByTestId(DATA_TEST_PASSWORD);
    const btnEnter = screen.getByTestId(DATA_TEST_BTN);
    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, INPUT_PASSWORD);
    userEvent.click(btnEnter);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
