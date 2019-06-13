import * as React from 'react';
import {Main} from '../main/main';
import {ActionCreator} from '../../reducers/cities/cities';
import {getCity, getCities, getCityOffers, getCitiesCoords} from '../../reducers/selectors';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class App extends React.PureComponent {
  render() {
    const {
      offers,
      city,
      cities,
      handleCityChange,
      citiesCoords,
    } = this.props;
    return (
      <Main
        apartments={offers}
        city={city}
        cities={cities}
        handleCityChange={handleCityChange}
        citiesCoords={citiesCoords}
      />
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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  citiesCoords: getCitiesCoords(state),
  offers: getCityOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(ActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
