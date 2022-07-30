import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProfileEffects from '../hooks/useProfileEffects';
import checkIcon from '../images/checkIcon.svg';
import profileHeart from '../images/profileHeart.svg';
import logoutIcon from '../images/logoutIcon.svg';
import smileIcon from '../images/smileIcon.svg';
import pictureIcon from '../images/pictureIcon.svg';

function Profile({ history }) {
  const { savedEmail } = useProfileEffects();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    if (localStorage.getItem('doneRecipes')) {
      localStorage.removeItem('doneRecipes');
    }
    if (localStorage.getItem('favoriteRecipes')) {
      localStorage.removeItem('favoriteRecipes');
    }
    if (localStorage.getItem('inProgressRecipes')) {
      localStorage.removeItem('inProgressRecipes');
    }
    history.push('/');
  };
  return (
    <main>
      <div className="top__container">
        <Header title="Profile" hasSearchBar={ false } history={ history } />
      </div>
      <section className="section__profile">
        <section className="profile_container">
          <img className="profile_smile" alt="smileIcon" src={ smileIcon } />
          <div className="profile_picture_container">
            <img className="profile_picture" alt="pictureIcon" src={ pictureIcon } />
            <p
              data-testid="profile-email"
              className="profile_container_email"
            >
              {savedEmail}
            </p>
          </div>
          <div className="buttons-container">
            <button
              type="button"
              data-testid="profile-done-btn"
              className="profile_done_btn"
              onClick={ () => history.push('/done-recipes') }
            >
              <img className="profile_checked" alt="checkIcon" src={ checkIcon } />
              Done Recipes
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className="profile_favorite_btn"
              onClick={ () => history.push('/favorite-recipes') }
            >
              <img className="profile_heart" alt="heartIcon" src={ profileHeart } />
              Favorite Recipes
            </button>
            <button
              type="button"
              data-testid="profile-logout-btn"
              className="profile_logout_btn"
              onClick={ logout }
            >
              <img className="profile_logout" alt="logoutIcon" src={ logoutIcon } />
              Logout
            </button>
          </div>
        </section>
      </section>
      <Footer history={ history } />
    </main>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(),
};

Profile.defaultProps = {
  history: {},
};

export default Profile;
