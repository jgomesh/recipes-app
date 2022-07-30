import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteBtn({ cardDetails, index, recipeType }) {
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const hasFoodOrDrink = recipeType !== 'food' && recipeType !== 'drink';

  const checkFavorite = (idType) => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const isFavorite = favoriteRecipes.some(
        (item) => item.id === (hasFoodOrDrink ? cardDetails[idType] : cardDetails.id),
      );
      return isFavorite ? blackHeart : whiteHeart;
    }
    return whiteHeart;
  };

  useEffect(() => {
    if (favoriteRecipe) setFavoriteRecipe(false);
  }, [favoriteRecipe]);

  const testObject = recipeType !== 'idDrink'
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
    };

  const setAsFavorite = () => {
    let newFavorite;
    if (hasFoodOrDrink) {
      newFavorite = testObject;
    } else {
      newFavorite = cardDetails;
    }

    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      const isFavorite = favoriteRecipes.some(
        (item) => item.id === (hasFoodOrDrink ? cardDetails[recipeType] : cardDetails.id),
      );
      if (isFavorite) {
        const newFavorites = favoriteRecipes.filter(
          (recipe) => recipe.id !== (hasFoodOrDrink
            ? cardDetails[recipeType] : cardDetails.id),
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipes, newFavorite]),
        );
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
    setFavoriteRecipe(true);
    // checkFavorite(recipeType);
  };

  return (
    <button type="button" className="card__btn" onClick={ setAsFavorite }>
      <img
        data-testid={ typeof index === 'number'
          ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
        src={ checkFavorite(recipeType) }
        alt="favorite-btn"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
  index: PropTypes.shape(),
};

FavoriteBtn.defaultProps = {
  index: {},
};

export default FavoriteBtn;
