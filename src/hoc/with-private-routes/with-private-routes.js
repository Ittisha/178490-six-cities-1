import * as React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {getIsAuthorized} from '../../reducers/selectors';

const withPrivateRoutes = (Component) => {
  const WithPrivateRoute = (props) => {
    const {isAuthorized} = props;
    return isAuthorized ? <Component {...props} /> : <Redirect to="/login"/>;
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorized: getIsAuthorized(state),
  });

  WithPrivateRoute.propTypes = {
    isAuthorized: PropTypes.bool,
  };

  return connect(mapStateToProps)(WithPrivateRoute);
};

export {withPrivateRoutes};
