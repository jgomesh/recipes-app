import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

describe('Start Recipe function tests', () => {
  beforeEach(cleanup);
  it('Testar componentes caso ja tenha algo no localStorage inProgressRecipes', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
  
    history.push('/foods/52977/');
    const detailStart = await screen.findByTestId('start-recipe-btn');
    expect(detailStart).toHaveTextContent('Start Recipe');
    userEvent.click(detailStart);
    expect(history.location.pathname).toBe('/foods/52977/in-progress')
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{},"meals":{"52977":[]}});

    history.push('/foods/53060');

    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');

    userEvent.click(await screen.findByTestId('start-recipe-btn'));

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{},"meals":{"52977":[], "53060": []}});

    localStorage.setItem('inProgressRecipes', JSON.stringify({"cocktails":{ "51260": [] },"meals":{}}));
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{ "51260": [] },"meals":{}});

    history.push('/foods/53060');

    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
    userEvent.click(await screen.findByTestId('start-recipe-btn'));
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{ "51260": [] },"meals":{ "53060": []}});

  });
});
