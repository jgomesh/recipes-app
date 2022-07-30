import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';
import { LOCAL_MOCK, DONE_MOCK }  from './mocks/mocks';

describe('RecipeInProgress page tests', () => {
  beforeEach(cleanup);
  it('Testar componentes caso ja tenha não tenha nada no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
  
    history.push('/foods/53060/in-progress');

    const PROGRESS_IMG = await screen.findByTestId('recipe-photo');
    const PROGRESS_TITLE = await screen.findByTestId('recipe-title');
    const PROGRESS_INSTRUCTIONS = await screen.findByTestId('instructions');
    const PROGRESS_SHARE = await screen.findByTestId('share-btn');
    const PROGRESS_FAV = await screen.findByTestId('favorite-btn');
    const PROGRESS_CATEGORY = await screen.findByTestId('recipe-category');
    const PROGRESS_FINISH_BTN = await screen.findByTestId('finish-recipe-btn');
    
    const COMPONENTS = [
      PROGRESS_CATEGORY,
      PROGRESS_FAV,
      PROGRESS_SHARE,
      PROGRESS_INSTRUCTIONS,
      PROGRESS_TITLE,
      PROGRESS_IMG,
      PROGRESS_FINISH_BTN,
    ]

    const stop = 5;

    for(let i = 0; i <= stop; i+= 1) {
      expect(await screen.findByTestId(`${i}-ingredient-step`)).toBeInTheDocument();
    }

    COMPONENTS.forEach((component) => {
      expect(component).toBeInTheDocument();
    })

    expect(PROGRESS_FINISH_BTN.disabled).toBeTruthy();

    for(let i = 0; i <= stop; i+= 1) {
      userEvent.click(await screen.findByTestId(`${i}-ingredient-step`));
    }

    expect(screen.queryByTestId('finish-recipe-btn').disabled).toBeFalsy();

    userEvent.click(screen.queryByTestId('finish-recipe-btn'));

    expect(history.location.pathname).toBe('/done-recipes')

  });
  it('Testar componentes caso ja tenha algo no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')

    localStorage.setItem('InProgressRecipes', JSON.stringify(LOCAL_MOCK));
    localStorage.setItem('doneRecipes', JSON.stringify([]))
    history.push('/foods/53060/in-progress');

    const PROGRESS_IMG = await screen.findByTestId('recipe-photo');
    const PROGRESS_TITLE = await screen.findByTestId('recipe-title');
    const PROGRESS_INSTRUCTIONS = await screen.findByTestId('instructions');
    const PROGRESS_SHARE = await screen.findByTestId('share-btn');
    const PROGRESS_FAV = await screen.findByTestId('favorite-btn');
    const PROGRESS_CATEGORY = await screen.findByTestId('recipe-category');
    const PROGRESS_FINISH_BTN = await screen.findByTestId('finish-recipe-btn');
    
    const COMPONENTS = [
      PROGRESS_CATEGORY,
      PROGRESS_FAV,
      PROGRESS_SHARE,
      PROGRESS_INSTRUCTIONS,
      PROGRESS_TITLE,
      PROGRESS_IMG,
      PROGRESS_FINISH_BTN,
    ]

    COMPONENTS.forEach((component) => {
      expect(component).toBeInTheDocument();
    })

    expect(screen.queryByTestId('finish-recipe-btn').disabled).toBeFalsy();

    userEvent.click(screen.queryByTestId('finish-recipe-btn'));

    const SAVED_LOCAL = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(SAVED_LOCAL).toStrictEqual(DONE_MOCK);

    localStorage.setItem('doneRecipes', JSON.stringify(DONE_MOCK));
    history.push('/foods/53060/in-progress');

    const FINDBTN = await screen.findByTestId('finish-recipe-btn');

    expect(FINDBTN.disabled).toBeFalsy();
    userEvent.click(screen.getByTestId('finish-recipe-btn'));

    expect(SAVED_LOCAL).toStrictEqual(DONE_MOCK);
  });
});
