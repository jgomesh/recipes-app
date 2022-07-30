import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, name, image, history, path }) {
  return (
    <button
      className="cards__section__btn"
      type="button"
      onClick={ () => history.push(path) }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="cards__section__btn__container"
      >
        <div className="cards__section__btn__container__text">
          <h3
            data-testid={ `${index}-card-name` }
          >
            {name}

          </h3>
        </div>
        <img
          className="cards__section__btn__container__img"
          src={ image }
          data-testid={ `${index}-card-img` }
          alt={ name }
        />
      </div>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default Card;
