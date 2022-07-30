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
  
    history.push('/drinks/15997/');
    const detailStart = await screen.findByTestId('start-recipe-btn');
    expect(detailStart).toHaveTextContent('Start Recipe');
    userEvent.click(detailStart);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress')
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{"15997":[]},"meals":{}});

    history.push('/drinks/15997/');

    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Continue Recipe');

    userEvent.click(await screen.findByTestId('start-recipe-btn'));

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{15997: []},"meals":{}});

    localStorage.setItem('inProgressRecipes', JSON.stringify({"cocktails":{},"meals":{"51260": []}}));
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{},"meals":{"51260": []}});

    history.push('/drinks/15997/');

    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
    userEvent.click(await screen.findByTestId('start-recipe-btn'));
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual({"cocktails":{ "15997": [] },"meals":{ "51260": [] }});

  });
});