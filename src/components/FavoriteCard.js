import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function FavoriteCard({ recipe, index, history }) {
  const [isFavorited, setIsFavorite] = useState(true);
  const verifieFavorite = () => {
    setIsFavorite(false);
  };
  const { id, image, name, nationality, type, alcoholicOrNot, category } = recipe;
  return (
    // <div className="done__recipe__card">
    isFavorited
        && (
          <div className="done__recipe__card">
            <button
              type="button"
              className="no-border"
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                src={ image }
                alt={ recipe.name }
                className="recipe-image"
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <div className="done__recipe__card__infos">
              <h6
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality}${alcoholicOrNot} - ${category}`}
              </h6>
              <button
                type="button"
                className="no-border"
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              >
                <h6 data-testid={ `${index}-horizontal-name` }>{name}</h6>
              </button>
              <div>
                <ShareBtn index={ { index } } path={ `/${type}s/${id}` } />
                <button type="button" onClick={ verifieFavorite } className="no-border">
                  <FavoriteBtn
                    cardDetails={ recipe }
                    index={ index }
                    recipeType={ type }
                  />
                </button>
              </div>
            </div>
          </div>
        )
  // </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default FavoriteCard;
