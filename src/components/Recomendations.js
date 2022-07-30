import React from 'react';
import { PropTypes } from 'prop-types';

function Recomendations({ recipes, type }) {
  return (
    <div className="recomendations__container">
      <div className="recomendations__container__box">
        <div className="recomendations__container__box__red__bar" />
        {recipes.map((item, i) => (
          <div
            key={ item[type] }
            className="recomendations__container__box__item"
            data-testid={ `${i}-recomendation-card` }
          >
            <img
              src={ item[`${type}Thumb`] }
              className="recomendations__container__box__item__img"
              alt={ item[type] }
            />
            <h1
              data-testid={ `${i}-recomendation-title` }
              className="recomendations__container__box__item__title"
            >
              {item[type]}

            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendations;
