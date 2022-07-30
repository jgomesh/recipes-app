import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

describe('RecipeDetails page tests', () => {
  beforeEach(cleanup);
  it('Testar se somos redirecionados para a rota certa após o clique', async () => {
    const { history } = renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
  
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);

    expect(history.location.pathname).toBe('/foods');

    const firstFood = await screen.findByTestId('0-card-img');

    expect(firstFood).toBeInTheDocument();

    userEvent.click(firstFood);

    expect(history.location.pathname).toBe('/foods/52977');

    const detailImage = await screen.findByTestId('recipe-photo');
    const detailTitle = await screen.findByTestId('recipe-title');
    const detailShare = await screen.findByTestId('undefined-horizontal-share-btn');
    const detailFavorite = await screen.findByTestId('favorite-btn');
    const detailInstructions = await screen.findByTestId('instructions');
    const detailVideo = await screen.findByTestId('video');
    const detailStart = await screen.findByTestId('start-recipe-btn');

    const stop = 12;
    for(let i = 0; i <= stop; i += 1) {
      expect(await screen.findByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }

    expect(detailImage).toBeInTheDocument();
    expect(detailTitle).toBeInTheDocument();
    expect(detailShare).toBeInTheDocument();
    expect(detailFavorite).toBeInTheDocument();
    expect(detailInstructions).toBeInTheDocument();
    expect(detailVideo).toBeInTheDocument();
    expect(detailStart).toBeInTheDocument();
    expect(detailImage).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(detailVideo).toHaveAttribute('src', 'https://www.youtube.com/embed/VVnZd8A84z4');
    expect(detailStart).toHaveTextContent('Start Recipe');

    expect(detailFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')

    userEvent.click(detailFavorite);

    expect(detailFavorite).toHaveAttribute('src', 'blackHeartIcon.svg')

    userEvent.click(detailFavorite);

    expect(detailFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg')

    const stop2 = 5;

    for(let i = 0; i <= stop2; i += 1) {
      expect(await screen.findByTestId(`${i}-recomendation-card`)).toBeInTheDocument();
    }
  });
  it('Testar componentes caso ja tenha algo no localStorage inProgressRecipes', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
    localStorage.setItem('inProgressRecipes', JSON.stringify({"cocktails":{},"meals":{"52977":[]}}))
    history.push('/foods/52977/');
    const detailStart = await screen.findByTestId('start-recipe-btn');
    expect(detailStart).toHaveTextContent('Continue Recipe');

    localStorage.setItem('inProgressRecipes', JSON.stringify({"cocktails":{},"meals":{"52977":[1,2,3,4,5,6,7,8,9,10,11,12,13]}}))
    renderWithRouter(<App />);
    history.push('/foods/52977/');
    expect(detailStart).toHaveTextContent('Continue Recipe');
  });
});
