import React from 'react';
import { screen, cleanup, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import Provider from '../context/Provider';
import renderWithRouter from './renderWithRouter';
const helpers = require('../services/helpers');
import App from '../App';

describe('SearchBar component tests', () => {
  afterEach(cleanup);
  it('Testa se ao pesquisar uma comida renderiza comida, se pesquisar bebida renderiza bebida', async () => {
    renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
    
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);
    
    const SEARCH_ICON = screen.getByTestId('search-top-btn');

    expect(SEARCH_ICON).toBeInTheDocument();

    userEvent.click(SEARCH_ICON);

    const SEARCH_INPUT = screen.getByTestId('search-input');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');
    const NAME_RADIO = screen.getByTestId('name-search-radio');

    userEvent.type(SEARCH_INPUT, 'chicken');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();

    const DRINKS_GO = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(DRINKS_GO); 

    userEvent.click(screen.getByTestId('search-top-btn'));


    userEvent.type(SEARCH_INPUT, 'vodka');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(await screen.findByTestId('1-recipe-card')).toBeInTheDocument();
  });
  it('Testar se o alert é chamado', async () => {
    window.alert = jest.fn().mockResolvedValue(() => {});
    renderWithRouter(<App />);
    const EMAIL_INPUT = screen.getByTestId('email-input');
    const PASSWORD_INPUT = screen.getByTestId('password-input');
    const LOGIN_BTN = screen.getByTestId('login-submit-btn');
    
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');
    userEvent.type(PASSWORD_INPUT, '123456789');
    userEvent.click(LOGIN_BTN);
    
    const SEARCH_ICON = screen.getByTestId('search-top-btn');

    expect(SEARCH_ICON).toBeInTheDocument();

    userEvent.click(SEARCH_ICON);

    const SEARCH_INPUT = screen.getByTestId('search-input');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');
    const NAME_RADIO = screen.getByTestId('name-search-radio');
    const FIRST_RADIO = screen.getByTestId('first-letter-search-radio');

    userEvent.type(SEARCH_INPUT, 'xablau');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters.")
    })

    userEvent.click(FIRST_RADIO);
    userEvent.click(BTN_SEARCH);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(2);
      expect(window.alert).toHaveBeenCalledWith("Your search must have only 1 (one) character")
    })
  });
  it('Testar se o alert é chamado', async () => {
    const history = createMemoryHistory();
    render(<Provider><SearchBar title="Foods" history={ history } /></Provider>)
    const SEARCH_INPUT = screen.getByTestId('search-input');
    const INGRE_RADIO = screen.getByTestId('ingredient-search-radio');
    const NAME_RADIO = screen.getByTestId('name-search-radio');
    const FIRST_RADIO = screen.getByTestId('first-letter-search-radio');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');

    expect(SEARCH_INPUT).toBeInTheDocument();
    expect(INGRE_RADIO).toBeInTheDocument();
    expect(NAME_RADIO).toBeInTheDocument();
    expect(FIRST_RADIO).toBeInTheDocument();
    expect(BTN_SEARCH).toBeInTheDocument();
  });
  it('Testar se os componentes do header estão aparecendo ao pesquisar por name', () => {
    jest.spyOn(global, 'fetch');
    const history = createMemoryHistory();
    render(<Provider><SearchBar title="Foods" history={ history } /></Provider>)
    const SEARCH_INPUT = screen.getByTestId('search-input');
    const INGRE_RADIO = screen.getByTestId('ingredient-search-radio');
    const NAME_RADIO = screen.getByTestId('name-search-radio');
    const FIRST_RADIO = screen.getByTestId('first-letter-search-radio');
    const BTN_SEARCH = screen.getByTestId('exec-search-btn');

    expect(SEARCH_INPUT).toBeInTheDocument();
    expect(INGRE_RADIO).toBeInTheDocument();
    expect(NAME_RADIO).toBeInTheDocument();
    expect(FIRST_RADIO).toBeInTheDocument();
    expect(BTN_SEARCH).toBeInTheDocument();

    userEvent.type(SEARCH_INPUT, 'chicken');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");

    userEvent.click(INGRE_RADIO);
    userEvent.click(BTN_SEARCH);

    expect(fetch).toHaveBeenCalledTimes(4);
    expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");

    render(<Provider><SearchBar title="Foods" history={ history } /></Provider>)

    userEvent.type(FIRST_RADIO, 'a');
    userEvent.click(NAME_RADIO);
    userEvent.click(BTN_SEARCH);
    
    expect(fetch).toHaveBeenCalledTimes(7);
  });
  it('Testando a função checkError caso undefined', () => {
    const checkErrosMock = jest.spyOn(helpers, 'checkErrors');
    const history = createMemoryHistory();
    const pushMock = jest.spyOn(history, 'push');
    window.alert = jest.fn().mockResolvedValue(() => {});
    checkErrosMock(undefined, 'drinks', window.alert, history);

    expect(checkErrosMock).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledTimes(1);

    checkErrosMock({ drinks: null }, 'drinks', window.alert, history);

    expect(checkErrosMock).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledTimes(2);

    checkErrosMock({ drinks: [{idDrink: 12}] }, 'drinks', window.alert, history);

    expect(checkErrosMock).toHaveBeenCalledTimes(3);
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/drinks/12');


    checkErrosMock({ meals: [{idMeal: 24}] }, 'meals', window.alert, history);

    expect(checkErrosMock).toHaveBeenCalledTimes(4);
    expect(pushMock).toHaveBeenCalledTimes(2);
    expect(pushMock).toHaveBeenCalledWith('/foods/24');

    checkErrosMock({ oi: null }, 'drinks', window.alert, history);
    checkErrosMock({ oi: null }, 'foods', window.alert, history);

    expect(window.alert).toHaveBeenCalledTimes(4);

  })
  it('Testando a função isItDrinkF', () => {
    const isItDrinkMock = jest.spyOn(helpers, 'isItDrinkF');;

    isItDrinkMock('Drinks');
    expect(isItDrinkMock).toHaveBeenCalled();
    expect(isItDrinkMock('Drinks')).toBe('thecocktaildb');
    expect(isItDrinkMock('Foods')).toBe('themealdb');
  })
  it('Testando a função isItMealF', () => {
    const isItMealMock = jest.spyOn(helpers, 'isItMealF');;

    isItMealMock('Drinks');
    expect(isItMealMock).toHaveBeenCalled();
    expect(isItMealMock('Drinks')).toBe('drinks');
    expect(isItMealMock('Foods')).toBe('meals');
  })
});
