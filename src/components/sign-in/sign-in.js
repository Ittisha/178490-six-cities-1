import React from 'react';
import PropTypes from 'prop-types';

export const SignIn = (props) => {
  const {
    onChange,
    onClick,
    user
  } = props;

  return <main className="page__main page__main--login">
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              value={user.email}
              onChange={onChange}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
              value={user.password}
              onChange={onChange}
            />
          </div>
          <button
            className="login__submit form__submit button"
            type="submit"
            onClick={onClick}
          >
            Sign in
          </button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span> // TODO
          </a>
        </div>
      </section>
    </div>
  </main>;
};

SignIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
