import { useEffect, useState } from 'react';

const useDetailsStorage = (match) => {
  const [btnName, setBtnName] = useState('Start Recipe');

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const checkProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ).cocktails;
      if (Object.keys(checkProgressRecipes).some((item) => item === match.params.id)) {
        setBtnName('Continue Recipe');
      }
    }
  }, []);
  return { btnName };
};

export default useDetailsStorage;
