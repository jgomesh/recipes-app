import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import RecepiesAppContext from '../context/RecepiesAppContext';
import CategoryButtons from '../components/CategoryButtons';

function Drinks({ history }) {
  const { recipesList } = useContext(RecepiesAppContext);
  let recipes = [];
  recipes = recipesList.drinks
    ? recipesList.drinks.filter((item, index) => index < +'12') : [];
  return (
    <>
      <div className="top__container">
        <Header title="Drinks" hasSearchBar history={ history } />
        <CategoryButtons title="Drinks" />
      </div>
      <section className="cards__section">
        {
          recipes.map((item, index) => (
            <Card
              key={ index }
              name={ item.strDrink }
              index={ index }
              image={ item.strDrinkThumb }
              path={ `drinks/${item.idDrink}` }
              history={ history }
            />
          ))
        }

      </section>
      <Footer history={ history } />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape(),
};

Drinks.defaultProps = {
  history: {},
};

export default Drinks;
