import React from 'react';
import PropTypes from 'prop-types';

export const withAuthorization = (Component) => {
  class WithAuthorization extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        user: {
          email: ``,
          password: ``
        }
      };

      this._handleClick = this._handleClick.bind(this);
      this._handleChange = this._handleChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onChange={this._handleChange}
        onClick={this._handleClick}
        user={this.state.user}
      />;
    }

    _handleChange(event) {
      this.setState({
        user: Object.assign({}, this.state.user, {
          [event.target.name]: event.target.value
        })
      });
    }

    _handleClick(evt) {
      const {email, password} = this.state.user;
      const {onLogIn} = this.props;

      evt.preventDefault();
      onLogIn({
        email,
        password,
      });

    }
  }

  WithAuthorization.propTypes = {
    onLogIn: PropTypes.func.isRequired,
  };

  return WithAuthorization;
};
