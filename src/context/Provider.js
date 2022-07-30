import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from './RecepiesAppContext';

function Provider({ children }) {
  const [estado, setEstado] = useState({ email: '', password: '', isDisabled: true });
  const [searchType, setSearchType] = useState('');
  const [backupList, setBackupList] = useState({
    meals: [],
    drinks: [],
  });
  const [recipesList, setRecipes] = useState({
    meals: [],
    drinks: [],
  });

  useEffect(() => {
    const initialFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes((prevState) => ({ ...prevState, meals: data.meals }));
      setBackupList((prevState) => ({ ...prevState, meals: data.meals }));
    };
    const initialDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes((prevState) => ({ ...prevState, drinks: data.drinks }));
      setBackupList((prevState) => ({ ...prevState, drinks: data.drinks }));
    };
    initialFoods();
    initialDrinks();
  }, []);

  const context = {
    estado,
    setEstado,
    searchType,
    setSearchType,
    recipesList,
    setRecipes,
    backupList,
  };

  return (
    <RecepiesAppContext.Provider value={ context }>
      {children}
    </RecepiesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
