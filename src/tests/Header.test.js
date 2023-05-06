import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import Header from '../components/Header';

const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const PAGE_TITLE = 'page-title';

describe('Testes do componente Header', () => {
  it('Verifica se o ícone do perfil está presente na tela', () => {
    renderWithRouter(<Header />, ['/meals']);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN);
    expect(profileIcon).toBeInTheDocument();
  });

  it('Verifica se o ícone de busca está presente na tela ao acessar a página de Meals', () => {
    renderWithRouter(<Header />, ['/meals']);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).toBeInTheDocument();
  });

  it('Verifica se o ícone de busca não está presente na tela ao acessar a página inicial', () => {
    renderWithRouter(<Header />);
    const searchIcon = screen.queryByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no ícone de perfil redireciona para a página de perfil', () => {
    const { history } = renderWithRouter(<Header />, ['/meals']);
    const profileIcon = screen.getByTestId(PROFILE_TOP_BTN);
    fireEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se ao clicar no ícone de busca, a barra de pesquisa é exibida', () => {
    renderWithRouter(<Header />, ['/meals']);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica se ao clicar novamente no ícone de busca, a barra de pesquisa é ocultada', () => {
    renderWithRouter(<Header />, ['/meals']);
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    fireEvent.click(searchIcon);
    fireEvent.click(searchIcon);
    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica se o título da página é exibido corretamente na página de Drinks', () => {
    renderWithRouter(<Header />, ['/drinks']);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Drinks');
  });

  it('Verifica se o título da página é exibido corretamente na página de Profile', () => {
    renderWithRouter(<Header />, ['/profile']);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Profile');
  });

  it('Verifica se o componente Header não é exibido em rotas específicas', () => {
    renderWithRouter(<Header />, ['/']);
    expect(screen.queryByTestId(PROFILE_TOP_BTN)).not.toBeInTheDocument();
    expect(screen.queryByTestId(PAGE_TITLE)).not.toBeInTheDocument();
  });

  it('Deve exibir o título de página correto para Done Recipes', () => {
    renderWithRouter(<Header />, ['/done-recipes']);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Done Recipes');
  });

  it('Deve exibir o título de página correto para Favorite Recipes', () => {
    renderWithRouter(<Header />, ['/favorite-recipes']);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Favorite Recipes');
  });
});
