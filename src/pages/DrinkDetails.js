import React from 'react';
import PropTypes from 'prop-types';
import DrinkDetailCard from '../components/DrinkDetailCard';
import Recomendations from '../components/Recomendations';
import useFetchDetails from '../hooks/useFetchDetails';
import useDoneRecipesStorage from '../hooks/useDoneRecipesStorage';
import useDetailsStorage from '../hooks/useDetailsStorage';
import start from '../images/start.svg';

function DrinkDetails({ match, history }) {
  const { recomendedMeals, recipeDetail } = useFetchDetails(match);
  const { btnName } = useDetailsStorage(match);
  const { doneRecipes } = useDoneRecipesStorage();

  const startRecipe = () => {
    const isLocalStorage = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = isLocalStorage
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { meals: {} };
    if (isLocalStorage && JSON.parse(isLocalStorage).cocktails) {
      if (!Object.keys(inProgressRecipes.cocktails)
        .some((item) => item === match.params.id)) {
        localStorage
          .setItem('inProgressRecipes', JSON
            .stringify({ ...inProgressRecipes,
              cocktails: { ...inProgressRecipes.cocktails, [match.params.id]: [] } }));
      }
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
          cocktails: { [match.params.id]: [] } }));
    }
    history.push(`/drinks/${match.params.id}/in-progress`);
  };

  return (
    <>
      {recipeDetail && (
        <DrinkDetailCard
          cardDetails={ recipeDetail.drinks[0] }
          path={ history.location.pathname }
        />
      )}
      {recomendedMeals && <Recomendations recipes={ recomendedMeals } type="strMeal" />}
      {!doneRecipes.some((item) => item.id === match.params.id)
        && (
          <div className="start__container">
            <button
              type="button"
              className="start__container__btn"
              data-testid="start-recipe-btn"
              onClick={ startRecipe }
            >
              <img src={ start } className="start__container__icon" alt="start" />
              {btnName}
            </button>
          </div>
        )}
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default DrinkDetails;
