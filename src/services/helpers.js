export const checkErrors = (data, isItMeal, alertMessage, history) => {
  if (data === undefined || data[isItMeal] === null) {
    alertMessage();
  } else if (data) {
    if (!data[isItMeal]) {
      alertMessage();
    }
    if (data[isItMeal] && data[isItMeal].length === 1) {
      if (isItMeal === 'drinks') {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      } else {
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
    }
  }
};

export const isItDrinkF = (title) => (
  title === 'Drinks' ? 'thecocktaildb' : 'themealdb'
);

export const isItMealF = (title) => (
  title === 'Drinks' ? 'drinks' : 'meals'
);

export const inProgressRecipesF = () => {
  const isLocalStorage = localStorage.getItem('inProgressRecipes');
  return isLocalStorage
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : { cocktails: {} };
};

export const mountNewObject = (cardDetails, recipeType) => (
  recipeType !== 'idDrink'
    ? {
      id: cardDetails.idMeal,
      type: 'food',
      nationality: cardDetails.strArea,
      category: cardDetails.strCategory,
      alcoholicOrNot: '',
      name: cardDetails.strMeal,
      image: cardDetails.strMealThumb,
    }
    : {
      id: cardDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: cardDetails.strCategory,
      alcoholicOrNot: cardDetails.strAlcoholic,
      name: cardDetails.strDrink,
      image: cardDetails.strDrinkThumb,
    }
);
