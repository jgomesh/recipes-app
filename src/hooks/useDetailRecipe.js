import { useEffect, useState } from 'react';
import fetchRecipes from '../services/services';
import { isItDrinkF } from '../services/helpers';

const useDetailRecipe = (match, title) => {
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const enterData = title === 'Drinks' ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchRecipes(
        `https://www.${isItDrinkF(title)}.com/api/json/v1/1/lookup.php?i=${
          match.params.id
        }`,
      );
      setDetailsRecipe(details[enterData][0]);
    };
    fetchDetails();
  }, []);

  return { detailsRecipe };
};

export default useDetailRecipe;
