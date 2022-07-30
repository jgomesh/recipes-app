import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
    expect(screen.queryByTestId('finish-recipe-btn').disabled).toBeFalsy();

    userEvent.click(await screen.findByTestId(`1-ingredient-step`));
    expect(screen.queryByTestId('finish-recipe-btn').disabled).toBeTruthy();

  });
});
