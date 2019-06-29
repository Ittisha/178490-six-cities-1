import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {USER_AUTHORIZATION_PROP_TYPES} from '../../props/user';
import cityPropsShape from '../../props/city';
import {getCity} from '../../reducers/selectors';
import {Operation} from '../../reducers/user/user';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this._formRef = React.createRef();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {
      onChange,
      disabled,
      city,
    } = this.props;

    return <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={this._handleFormSubmit}
              ref={this._formRef}
              onChange={onChange}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={disabled}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <NavLink
                className="locations__item-link"
                to="/">
                <span>{city.name}</span>
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {
      formData,
      onLogin,
      onSubmit,
    } = this.props;

    onLogin(formData);
    onSubmit();
    this._formRef.current.reset();
  }
}

SignIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  formData: USER_AUTHORIZATION_PROP_TYPES,
  city: cityPropsShape,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(Operation.logIn(data)),
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
