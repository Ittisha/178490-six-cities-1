import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreator as CitiesActionCreator} from '../../reducers/cities/cities';
import {getCity, getCities, getCityOffers, getCitiesCoords, getIsAuthorizationRequired} from '../../reducers/selectors';
import {Main} from '../main/main';
import Header from '../header/header';
import {SignIn} from '../sign-in/sign-in';
import withAuthorization from '../../hoc/with-authorization/with-authorization';

const SignInWithAuthorization = withAuthorization(SignIn);

export class App extends React.PureComponent {
  render() {
    const {
      offers,
      city,
      cities,
      handleCityChange,
      citiesCoords,
      isAuthorizationRequired,
    } = this.props;

    const renderScreen = () => {
      if (isAuthorizationRequired) {
        return (
          <SignInWithAuthorization />
        );
      }

      return (
        <Main
          apartments={offers}
          city={city}
          cities={cities}
          handleCityChange={handleCityChange}
          citiesCoords={citiesCoords}
        />
      );
    };


    return (
      <React.Fragment>
        <Header />
        {renderScreen()}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool,
    isInBookmarks: PropTypes.bool,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    cityName: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  citiesCoords: getCitiesCoords(state),
  offers: getCityOffers(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(CitiesActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
