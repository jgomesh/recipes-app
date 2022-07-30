import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Login page tests', () => {
  beforeEach(cleanup);
  it('Testar se os componentes da pag de login estão aparecendo', () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    expect(EMAIL_INPUT).toBeInTheDocument();
    expect(PASSWORD_INPUT).toBeInTheDocument();
    expect(LOGIN_BTN).toBeInTheDocument();
    expect(LOGIN_BTN.disabled).toBeTruthy();
    expect(history.location.pathname).toBe('/');
  });
  it('Testar se os componentes da pag de login estão aparecendo', () => {
    renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    
    expect(LOGIN_BTN.disabled).toBeFalsy();
  });
  it('Testar se somos redirecionados para a rota certa após o clique', () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods')
  });
});
