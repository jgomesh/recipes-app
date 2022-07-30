import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

describe('DrinkDetails page tests', () => {
  beforeEach(cleanup);
  it('Testar se somos redirecionados para a rota certa após o clique', async () => {
    const { history } = renderWithRouter(<App />);


    history.push('/drinks/15997');

    const detailImage = await screen.findByTestId('recipe-photo');
    const detailTitle = await screen.findByTestId('recipe-title');
    const detailShare = await screen.findByTestId('undefined-horizontal-share-btn');
    const detailFavorite = await screen.findByTestId('favorite-btn');
    const detailInstructions = await screen.findByTestId('instructions');
    const detailStart = await screen.findByTestId('start-recipe-btn');

    const stop = 2;
    for(let i = 0; i <= stop; i += 1) {
      expect(await screen.findByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }

    expect(detailImage).toBeInTheDocument();
    expect(detailTitle).toBeInTheDocument();
    expect(detailShare).toBeInTheDocument();
    expect(detailFavorite).toBeInTheDocument();
    expect(detailInstructions).toBeInTheDocument();
    expect(detailStart).toBeInTheDocument();
    expect(detailImage).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
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
    localStorage.setItem('inProgressRecipes', JSON.stringify({"meals":{},"cocktails":{"15997":["Galliano"]}}))
    history.push('/drinks/15997/');
    console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));

    
    const detailStart = await screen.findByTestId('start-recipe-btn');
    expect(detailStart).toHaveTextContent('Continue Recipe');

  });
});
