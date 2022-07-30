import React from 'react';
import { screen, cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import Provider from '../context/Provider';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Header component tests', () => {
  beforeEach(cleanup);
  it('Testar se os componentes do header estão aparecendo', () => {
    const history = createMemoryHistory();
    render(<Provider><Header title="Foods" hasSearchBar history={ history } /></Provider>)
    const PROFILE_ICON = screen.getByTestId('profile-top-btn');
    const SEARCH_ICON = screen.getByTestId('search-top-btn');
    const PAGE_TITLE = screen.getByTestId('page-title');

    expect(PROFILE_ICON).toBeInTheDocument();
    expect(SEARCH_ICON).toBeInTheDocument();
    expect(PAGE_TITLE).toBeInTheDocument();

    userEvent.click(SEARCH_ICON);

    const SEARCH_INPUT = screen.getByTestId('search-input');
    const INGRE_RADIO = screen.getByTestId('ingredient-search-radio');
    const NAME_RADIO = screen.getByTestId('name-search-radio');
    const FIRST_RADIO = screen.getByTestId('first-letter-search-radio');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');

    expect(SEARCH_INPUT).toBeInTheDocument();
    expect(INGRE_RADIO).toBeInTheDocument();
    expect(NAME_RADIO).toBeInTheDocument();
    expect(FIRST_RADIO).toBeInTheDocument();
    expect(BTN_SEARCH).toBeInTheDocument();

    userEvent.click(SEARCH_ICON);

    expect(SEARCH_INPUT).not.toBeInTheDocument();
    expect(INGRE_RADIO).not.toBeInTheDocument();
    expect(NAME_RADIO).not.toBeInTheDocument();
    expect(FIRST_RADIO).not.toBeInTheDocument();
    expect(BTN_SEARCH).not.toBeInTheDocument();
  });
  it('Testa se somos redirecionados para a rota correta', () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods')

    const PROFILE_ICON = screen.getByTestId('profile-top-btn');

    expect(PROFILE_ICON).toBeInTheDocument();

    userEvent.click(PROFILE_ICON);

    expect(history.location.pathname).toBe('/profile')
  });
});
