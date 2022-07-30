import { useEffect, useState } from 'react';

function useDoneRecipesStorage() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  return { doneRecipes };
}

export default useDoneRecipesStorage;
