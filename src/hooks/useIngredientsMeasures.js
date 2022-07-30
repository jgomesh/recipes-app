import { useEffect, useState } from 'react';

const useIngredientsMeasures = (detailsRecipe) => {
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [measuresFound, setMeasuresFound] = useState([]);

  useEffect(() => {
    const ingredientsKeys = Object.keys(detailsRecipe)
      .filter((item) => item.includes('Ingredient'));
    const measuresKeys = Object.keys(detailsRecipe)
      .filter((item) => item.includes('Measure'));
    const ingredients = ingredientsKeys
      .map((item) => detailsRecipe[item])
      .filter((item) => item !== '' && item !== null);
    const measures = measuresKeys
      .map((item) => detailsRecipe[item])
      .filter((item) => item !== '' && item !== null);
    setIngredientsFound(ingredients);
    setMeasuresFound(measures);
  }, [detailsRecipe]);

  return { ingredientsFound, measuresFound };
};

export default useIngredientsMeasures;
