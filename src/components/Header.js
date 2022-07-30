import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, hasSearchBar, history }) {
  const [searchBarVisible, setSearchbar] = useState(false);

  return (
    <>
      <header className="component__header">
        <button
          className="component__header__profile__btn"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            src={ profileIcon }
            alt="profile icon"
            className="component__header__profile__btn__img"
            data-testid="profile-top-btn"
          />
        </button>
        <h1 className="component__header__title" data-testid="page-title">{title}</h1>
        <div>
          {hasSearchBar && (
            <button
              type="button"
              className="component__header__search__btn"
              onClick={ () => setSearchbar(!searchBarVisible) }
            >
              <img
                src={ searchIcon }
                alt="search icon"
                className="component__header__search__btn__img"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </header>
      {searchBarVisible && <SearchBar title={ title } history={ history } />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
  history: PropTypes.shape(),
};

Header.defaultProps = {
  history: {},
};

export default Header;
