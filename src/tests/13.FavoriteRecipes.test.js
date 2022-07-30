import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FAVORITE_MOCK, MOCK_MEAL_DETAILS, MOCK_DRINK_DETAILS } from './mocks/mocks'
const helpers = require('../services/helpers');

describe('favoriteRecipes page tests', () => {
  beforeEach(cleanup);
  it('Testar componentes caso ja tenha não tenha nada no localStorage', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorite-recipes');

    const PROFILE_ICON = screen.getByTestId('profile-top-btn');
    const PAGE_TITLE = screen.getByTestId('page-title');
    const FILTER_ALL = screen.getByTestId('filter-by-all-btn');
    const FILTER_FOOD = screen.getByTestId('filter-by-food-btn');
    const FILTER_DRINK = screen.getByTestId('filter-by-drink-btn');

    expect(screen.queryByTestId('0-horizontal-image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-top-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-share-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-favorite-btn')).not.toBeInTheDocument();

  });
  it('Testar componentes caso ja tenha não tenha nada no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
  
    localStorage.setItem('favoriteRecipes', JSON.stringify(FAVORITE_MOCK))

    history.push('/favorite-recipes');

    const PROFILE_ICON = screen.getByTestId('profile-top-btn');
    const PAGE_TITLE = screen.getByTestId('page-title');
    const FILTER_ALL = screen.getByTestId('filter-by-all-btn');
    const FILTER_FOOD = screen.getByTestId('filter-by-food-btn');
    const FILTER_DRINK = screen.getByTestId('filter-by-drink-btn');

    const FIRST_RECIPE =  await screen.findByTestId('0-horizontal-image');
    const FIRST_TITLE =  await screen.findByTestId('0-horizontal-top-text');
    const FIRST_NAME =  await screen.findByTestId('0-horizontal-name');
    const SHARE_BTN =  await screen.findByTestId('0-horizontal-share-btn');
    const FAV_BTN =  await screen.findByTestId('0-horizontal-favorite-btn');

    const SECOND_RECIPE =  await screen.findByTestId('0-horizontal-image');
    const SECOND_TITLE =  await screen.findByTestId('0-horizontal-top-text');
    const SECOND_NAME =  await screen.findByTestId('0-horizontal-name');
    const SECOND_SHARE_BTN =  await screen.findByTestId('0-horizontal-share-btn');
    const SECOND_FAV_BTN =  await screen.findByTestId('0-horizontal-favorite-btn');


    const COMPONENTS = [
      PROFILE_ICON,
      PAGE_TITLE,
      FILTER_ALL,
      FILTER_FOOD,
      FILTER_DRINK,
      FIRST_RECIPE,
      FIRST_TITLE,
      FIRST_NAME,
      SHARE_BTN,
      FAV_BTN,
      SECOND_RECIPE,
      SECOND_TITLE,
      SECOND_NAME,
      SECOND_SHARE_BTN,
      SECOND_FAV_BTN,
    ];

    COMPONENTS.forEach((component) => {
      expect(component).toBeInTheDocument();
    })
    
    expect(PROFILE_ICON).toHaveAttribute('src', 'profileIcon.svg');

    userEvent.click(FILTER_FOOD);

    expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-name')).toHaveTextContent('Kumpir');
    expect(screen.queryByTestId('1-horizontal-image')).not.toBeInTheDocument();

    userEvent.click(FILTER_DRINK);

    expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-name')).toHaveTextContent('VODKA');
    expect(screen.queryByTestId('1-horizontal-image')).not.toBeInTheDocument();

    userEvent.click(FILTER_ALL);

    expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-name')).toHaveTextContent('Kumpir');
    expect(await screen.findByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-name')).toHaveTextContent('VODKA');

    userEvent.click(await screen.findByTestId('0-horizontal-name'));

    expect(history.location.pathname).toBe('/foods/52978')

  });
  it('Testando mountNewObject', () => {
    const mockMountObject = jest.spyOn(helpers, 'mountNewObject');


    const MOCK_RESULT_DRINK = {
      alcoholicOrNot: "Alcoholic",
      category: "Category",
      id: "1123",
      image: "https://www.google.com",
      name: "A1",
      nationality: "",
      type: "drink",
    };

    const MOCK_RESULT_MEAL = {
      "alcoholicOrNot": "",
      "category": "Italy",
      "id": "1213",
      "image": "https://www.google.com",
      "name": "Cuba",
      "nationality": "Turkish",
      "type": "food",
    };


    mockMountObject(MOCK_DRINK_DETAILS, 'idDrink')
    expect(mockMountObject(MOCK_DRINK_DETAILS, 'idDrink')).toStrictEqual(MOCK_RESULT_DRINK);
    expect(mockMountObject(MOCK_MEAL_DETAILS, 'idMeal')).toStrictEqual(MOCK_RESULT_MEAL)
  })
});
