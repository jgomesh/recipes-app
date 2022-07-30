import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealDetailCard from '../components/MealDetailCard';
import Recomendations from '../components/Recomendations';
import fetchRecipes from '../services/services';
import { inProgressRecipesF } from '../services/helpers';

function RecipeDetails({ match, history }) {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [recomendedDrinks, setRecomendedDrinks] = useState(null);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [btnName, setBtnName] = useState('Start Recipe');

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetail(data));
    };
    const fetchRecomendations = async () => {
      const recomendedRecipes = await fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecomendedDrinks(recomendedRecipes.drinks.filter((item, i) => i < +'6'));
    };
    fetchRecomendations();
    fetchDetails();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const checkDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(checkDoneRecipes);
    }
    if (localStorage.getItem('inProgressRecipes')) {
      const checkProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ).meals;
      if (Object.keys(checkProgressRecipes).some((item) => item === match.params.id)) {
        setBtnName('Continue Recipe');
      }
    }
  }, []);

  const startRecipe = () => {
    const isLocalStorage = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesF();
    if (isLocalStorage && JSON.parse(isLocalStorage).meals) {
      if (!Object.keys(inProgressRecipes.meals)
        .some((item) => item === match.params.id)) {
        localStorage
          .setItem('inProgressRecipes', JSON
            .stringify({ ...inProgressRecipes,
              meals: { ...inProgressRecipes.meals, [match.params.id]: [] } }));
      }
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
          meals: { [match.params.id]: [] } }));
    }
    history.push(`/foods/${match.params.id}/in-progress`);
  };

  return (
    <main className="recipes__container">
      {recipeDetail && (
        <MealDetailCard
          cardDetails={ recipeDetail.meals[0] }
          path={ history.location.pathname }
        />
      )}
      {recomendedDrinks && (
        <Recomendations type="strDrink" recipes={ recomendedDrinks } />
      )}
      {!doneRecipes.some((item) => item.id === match.params.id) && (
        <div className="start__container">
          <button
            type="button"
            className="start__container__btn"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
          >
            {btnName}
          </button>
        </div>
      )}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default RecipeDetails;
