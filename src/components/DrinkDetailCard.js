import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const DrinkDetailCard = ({ cardDetails, path }) => {
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = cardDetails;

  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== null);

  return (
    <>
      <div className="red__bar" />
      <div className="card__detail">
        <img
          src={ strDrinkThumb }
          data-testid="recipe-photo"
          alt="drink"
          className="card__detail__img"
        />
        <div className="card__detail__container">
          <h1
            data-testid="recipe-title"
            className="card__detail__container__title"
          >
            {strDrink}
          </h1>
          <p
            data-testid="recipe-category"
            className="card__detail__container__tag"
          >
            {strAlcoholic}

          </p>
          <div className="card__detail__container__btn">
            <ShareBtn path={ path } />
            <FavoriteBtn cardDetails={ cardDetails } recipeType="idDrink" />
          </div>
        </div>
      </div>
      <div className="ingredients__container">
        {ingredients.map((ingr, i) => (
          <p
            data-testid={ `${i}-ingredient-name-and-measure` }
            className="ingredients__container__item"
            key={ `ingr-${i}` }
          >
            {`${ingr}${measures[i] ? ` - ${measures[i]}` : ''}`}
          </p>
        ))}
      </div>
      <p data-testid="instructions" className="detail__paragraph">{strInstructions}</p>
    </>
  );
};

DrinkDetailCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default DrinkDetailCard;
