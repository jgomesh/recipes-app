import { useEffect, useState } from 'react';

function useFavoriteStorage() {
  const [favoriteRecipes, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(favorites);
    }
  }, []);
  return { favoriteRecipes };
}

export default useFavoriteStorage;
