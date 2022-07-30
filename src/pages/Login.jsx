import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecepiesAppContext from '../context/RecepiesAppContext';
import logo from '../images/logo.svg';

function Login({ history }) {
  const { setEstado,
    estado: { email, password, isDisabled } } = useContext(RecepiesAppContext);

  const handleValidation = () => {
    const PASSWORD_LENGTH = 6;
    // regex obtido através de:
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isValidated = regex.test(email);
    if (password.length >= PASSWORD_LENGTH && isValidated) {
      setEstado((estadoAntigo) => ({ ...estadoAntigo, isDisabled: false }));
    } else {
      setEstado((estadoAntigo) => ({ ...estadoAntigo, isDisabled: true }));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEstado((estadoAntigo) => ({ ...estadoAntigo, [name]: value }));
    handleValidation();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setEstado({ email: '', password: '', isDisabled: true });
    history.push('/foods');
  };

  return (
    <main className="login__page">
      <img className="login__page__logo" alt="logo" src={ logo } />
      <form className="login__page__forms" onSubmit={ handleSubmit }>
        <input
          className="login__page__forms__email"
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
          value={ email }
        />
        <input
          className="login__page__forms__password"
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="Password"
          onChange={ handleChange }
          value={ password }
        />
        <button
          type="submit"
          className="login__page__forms__button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
