import React from 'react';
import renderWithRouter from './renderWithRouter'; 
import { screen } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'
import { DONE_MOCK } from './mocks/mocks';
import App from '../App';

describe('60 - Testes da página de profile', () => {
    test('Testar se todos o data-testid do email e de todos os botões ', () => {
        const { history } = renderWithRouter(<App />);
        const emailLogin = screen.getByTestId(/email-input/i);
        const passLogin = screen.getByTestId(/password-input/i);
        const btnLogin = screen.getByTestId(/login-submit-btn/i);
        userEvent.type(emailLogin, 'email@email.com');
        userEvent.type(passLogin, '12345678');
        userEvent.click(btnLogin);
        const btnProfile = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(btnProfile);
        expect(history.location.pathname).toBe('/profile');

        const emailProfile = screen.getByTestId(/profile-email/);
        expect(emailProfile).toBeInTheDocument();
        expect(emailProfile).toHaveTextContent('email@email.com')
        const doneRecipe = screen.getByTestId(/profile-done-btn/);
        expect(doneRecipe).toBeInTheDocument();
        const favoriteRecipes = screen.getByTestId(/profile-favorite-btn/);
        expect(favoriteRecipes).toBeInTheDocument();
        const logout = screen.getByTestId(/profile-logout-btn/);
        expect(logout).toBeInTheDocument();
    })
    test('Testa se o botão done recepies envia para a página de destino', () => {
        const { history } = renderWithRouter(<App />);
        const emailLogin = screen.getByTestId(/email-input/i);
        const passLogin = screen.getByTestId(/password-input/i);
        const btnLogin = screen.getByTestId(/login-submit-btn/i);
        userEvent.type(emailLogin, 'email@email.com');
        userEvent.type(passLogin, '12345678');
        userEvent.click(btnLogin);
        const btnProfile = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(btnProfile);
        expect(history.location.pathname).toBe('/profile');

        const doneRecipe = screen.getByTestId(/profile-done-btn/);
        userEvent.click(doneRecipe);
        expect(history.location.pathname).toBe('/done-recipes');
    })
    test('Testa se o botão favorite recepies envia para a página de destino', () => {
        const { history } = renderWithRouter(<App />);
        const emailLogin = screen.getByTestId(/email-input/i);
        const passLogin = screen.getByTestId(/password-input/i);
        const btnLogin = screen.getByTestId(/login-submit-btn/i);
        userEvent.type(emailLogin, 'email@email.com');
        userEvent.type(passLogin, '12345678');
        userEvent.click(btnLogin);

        // userEvent.click(screen.getByTestId(/0-recipe-card/i))
        // userEvent.click(screen.getByTestId(/favorite-btn/i))
        const btnProfile = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(btnProfile);
        expect(history.location.pathname).toBe('/profile');

        const favoriteRecipe = screen.getByTestId(/profile-favorite-btn/);
        userEvent.click(favoriteRecipe);
        expect(history.location.pathname).toBe('/favorite-recipes');
    })
    test('Testa se o botão favorite recepies envia para a página de destino', () => {
        const { history } = renderWithRouter(<App />);
        const emailLogin = screen.getByTestId(/email-input/i);
        const passLogin = screen.getByTestId(/password-input/i);
        const btnLogin = screen.getByTestId(/login-submit-btn/i);
        userEvent.type(emailLogin, 'email@email.com');
        userEvent.type(passLogin, '12345678');
        userEvent.click(btnLogin);
        const btnProfile = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(btnProfile);
        expect(history.location.pathname).toBe('/profile');

        const save = JSON.parse(localStorage.getItem('user'));
        expect(save).toStrictEqual({email: "email@email.com"});
        const logout = screen.getByTestId(/profile-logout-btn/);
        userEvent.click(logout);
        expect(history.location.pathname).toBe('/');
        const save2 = JSON.parse(localStorage.getItem('user'));
        expect(save2).toBe(null);
    })
    test('Testa se o localStorage', async () => {
        jest.spyOn(Storage.prototype, 'setItem');
        jest.spyOn(Storage.prototype, 'getItem');
        localStorage.setItem('inProgressRecipes', JSON.stringify({"cocktails":{},"meals":{"52977":[]}}))
        localStorage.setItem('doneRecipes', JSON.stringify(DONE_MOCK));
        localStorage.setItem('favoriteRecipes', JSON.stringify(DONE_MOCK));
        const { history } = renderWithRouter(<App />);
    
        console.log(JSON.parse(localStorage.getItem('user')));
        history.push('/profile');
        
        const emailProfile = await screen.findByTestId(/profile-email/);

        const logout = screen.getByTestId(/profile-logout-btn/);

        expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{},"meals":{"52977":[]}})
        expect(JSON.parse(localStorage.getItem('doneRecipes'))).toStrictEqual(DONE_MOCK);
        expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual(DONE_MOCK);

        expect(emailProfile).toBeInTheDocument();
        expect(emailProfile).toHaveTextContent('');

        userEvent.click(logout);

        expect(localStorage.getItem('inProgressRecipes')).toBe(null);
        expect(localStorage.getItem('doneRecipes')).toBe(null);
        expect(localStorage.getItem('favoriteRecipes')).toBe(null);
    })
})