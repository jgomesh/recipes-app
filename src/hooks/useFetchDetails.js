import { useEffect, useState } from 'react';
import fetchRecipes from '../services/services';

const useFetchDetails = (match) => {
  const [recomendedMeals, setRecomendedMeals] = useState(null);
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => setRecipeDetail(data));
    };
    const fetchRecomendations = async () => {
      const recomendedRecipes = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecomendedMeals(recomendedRecipes.meals.filter((item, i) => i < +'6'));
    };
    fetchRecomendations();
    fetchDetails();
  }, []);

  return { recomendedMeals, recipeDetail, setRecipeDetail, setRecomendedMeals };
};

export default useFetchDetails;
