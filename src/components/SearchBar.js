import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from '../context/RecepiesAppContext';
import fetchRecipes from '../services/services';
import { checkErrors, isItDrinkF, isItMealF } from '../services/helpers';

function SearchBar({ title, history }) {
  const { setSearchType, searchType, setRecipes } = useContext(RecepiesAppContext);
  const [searchInput, setSearchInput] = useState('');

  const handleTextChange = ({ target }) => {
    setSearchInput(target.value);
  };
  const isItDrink = isItDrinkF(title);

  const alertMessage = () => {
    alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const saveRecipes = async () => {
    const firstLetterURL = `https://www.${isItDrink}.com/api/json/v1/1/search.php?f=`;
    if (searchType === firstLetterURL && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    } else {
      const data = await fetchRecipes(`${searchType}${searchInput}`);
      setRecipes(data);
      const isItMeal = isItMealF(title);
      checkErrors(data, isItMeal, alertMessage, history);
    }
  };

  return (
    <section className="component__searchbar">
      <div className="component__searchbar__container">
        <input
          type="text"
          id="search-input"
          name="searchInput"
          className="component__searchbar__container__input__name"
          data-testid="search-input"
          onChange={ handleTextChange }
          placeholder="Search for recipe, name or first letter"
        />
        <button
          className="component__searchbar__container__button"
          type="button"
          data-testid="exec-search-btn"
          onClick={ saveRecipes }
        >
          Search
        </button>
      </div>
      <form>
        <label htmlFor="ingredient" className="component__searchbar__ingredient">
          <input
            type="radio"
            id="ingredient"
            name="search_option"
            className="component__searchbar__ingredient__input"
            onClick={ () => setSearchType(
              `https://www.${isItDrink}.com/api/json/v1/1/filter.php?i=`,
            ) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name" className="component__searchbar__ingredient">
          <input
            type="radio"
            id="name"
            name="search_option"
            className="component__searchbar__ingredient__input"
            value="name"
            onClick={ () => setSearchType(
              `https://www.${isItDrink}.com/api/json/v1/1/search.php?s=`,
            ) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter" className="component__searchbar__ingredient">
          <input
            type="radio"
            id="first-letter"
            name="search_option"
            value="first-letter"
            className="component__searchbar__ingredient__input"
            onClick={ () => setSearchType(
              `https://www.${isItDrink}.com/api/json/v1/1/search.php?f=`,
            ) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </form>
    </section>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default SearchBar;
