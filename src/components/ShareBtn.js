import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ path, index }) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = () => {
    setCopied('Link copied!');
    copy(`http://localhost:3000${path.replace('/in-progress', '')}`);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyToClipboard }
        className="card__btn"
      >
        <img
          data-testid={ `${index.index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-btn"
        />
      </button>
      <span>{copied}</span>
    </>
  );
}

ShareBtn.propTypes = {
  path: PropTypes.string.isRequired,
  index: PropTypes.shape(),
};

ShareBtn.defaultProps = {
  index: {},
};

export default ShareBtn;
