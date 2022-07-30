import React from 'react';
import { screen, cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Provider from '../context/Provider';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Footer component tests', () => {
  afterEach(cleanup);
  it('Testar se os componentes do Footer estão aparecendo ao pesquisar por name', () => {
    const history = createMemoryHistory();
    render(<Provider><Footer  history={ history } /></Provider>)
    const DRINKS_IMG = screen.getByTestId('drinks-bottom-btn');
    const FOODS_IMG = screen.getByTestId('food-bottom-btn');
    
    expect(DRINKS_IMG).toBeInTheDocument();
    expect(FOODS_IMG).toBeInTheDocument();
  });
  it('Testar se os componentes do Footer redirecionam a rota', () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods')

    const DRINKS_IMG = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(DRINKS_IMG);

    expect(history.location.pathname).toBe('/drinks')
  });
  it('Testar se os componentes do Footer redirecionam a rota', () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods')

    const FOODS_IMG = screen.getByTestId('food-bottom-btn');

    userEvent.click(FOODS_IMG);

    expect(history.location.pathname).toBe('/foods')
  });
});
