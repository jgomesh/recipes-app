import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

describe('Local storage tests', () => {
  beforeEach(cleanup);
  it('Testar componentes caso ja tenha algo no localStorage inProgressRecipes', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
    localStorage.setItem('doneRecipes', JSON.stringify([{"id":"15997"}]))

    history.push('/drinks/15997/');

    const firstFood = await screen.findByTestId('recipe-title');

    expect(firstFood).toBeInTheDocument();

    userEvent.click(firstFood);

    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });
});