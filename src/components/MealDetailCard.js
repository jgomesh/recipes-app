import React from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const MealDetailCard = ({ cardDetails, path }) => {
  const { strMealThumb, strMeal, strInstructions, strCategory, strYoutube } = cardDetails;
  const ingredientsKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Ingredient'));
  const measuresKeys = Object.keys(cardDetails)
    .filter((item) => item.includes('Measure'));
  const ingredients = ingredientsKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');
  const measures = measuresKeys.map((item) => cardDetails[item])
    .filter((item) => item !== '');

  return (
    <>
      <div className="red__bar" />
      <div className="card__detail">
        <img
          src={ strMealThumb }
          data-testid="recipe-photo"
          className="card__detail__img"
          alt="meal"
        />
        <div className="card__detail__container">
          <h1
            data-testid="recipe-title"
            className="card__detail__container__title"
          >
            {strMeal}

          </h1>
          <p
            data-testid="recipe-category"
            className="card__detail__container__tag"
          >
            {strCategory}

          </p>
          <div className="card__detail__container__btn">
            <ShareBtn path={ path } />
            <FavoriteBtn cardDetails={ cardDetails } recipeType="idMeal" />
          </div>
        </div>
      </div>
      <div className="ingredients__container">
        {ingredients.map((ingr, i) => (
          <p
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ `ingr-${i}` }
            className="ingredients__container__item"
          >
            {`${ingr}${measures[i] ? ` - ${measures[i]}` : ''}`}
          </p>
        ))}

      </div>
      <p data-testid="instructions" className="detail__paragraph">{strInstructions}</p>
      <section className="video__container">
        <div className="video__container__border">
          <iframe
            title="recipe-video"
            width="400"
            className="video__container__border__video"
            src={ strYoutube.replace('/watch?v=', '/embed/') }
            data-testid="video"
          />
        </div>
      </section>
    </>
  );
};

MealDetailCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default MealDetailCard;
