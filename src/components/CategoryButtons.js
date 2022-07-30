import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/services';
import RecepiesAppContext from '../context/RecepiesAppContext';

function CategoryButtons({ title }) {
  const [categories, setCategories] = useState([]);
  const [lastCategory, setLastCategory] = useState('');
  const { setRecipes, backupList } = useContext(RecepiesAppContext);

  const URL = title === 'Drinks' ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list' : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const isItDrink = title === 'Drinks' ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchCategories = () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => setCategories(data[isItDrink]
          .filter((_item, index) => index < +'5')));
    };
    fetchCategories();
  }, []);

  const filterByCategory = async (category) => {
    if (lastCategory === category) {
      setLastCategory('');
      return setRecipes(backupList);
    }
    setLastCategory(category);
    const categoryUrl = title === 'Drinks' ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}` : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const objectKey = title === 'Drinks' ? 'drinks' : 'meals';
    const categoryList = await fetchRecipes(categoryUrl);
    setRecipes((prevState) => ({ ...prevState, [objectKey]: categoryList[objectKey] }));
  };

  const backToAll = () => {
    setRecipes(backupList);
    setLastCategory('All');
  };

  return (
    <>
      <section className="component__category">
        {categories.map((category) => (
          <button
            className={ `component__category__btn__general__${
              lastCategory === category.strCategory ? 'on' : 'off'
            }` }
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterByCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </section>
      <section className="set__all">
        <button
          type="button"
          className="set__all__btn__all"
          data-testid="All-category-filter"
          onClick={ backToAll }
        >
          All
        </button>
      </section>
    </>
  );
}

CategoryButtons.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryButtons;
