import { useEffect, useState } from 'react';
import fetchRecipes from '../services/services';

const useFetchDrinks = (match) => {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [recomendedDrinks, setRecomendedDrinks] = useState(null);

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

  return { recipeDetail, recomendedDrinks };
};

export default useFetchDrinks;
