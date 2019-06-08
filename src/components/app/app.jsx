import * as React from 'react';
import {Main} from '../main/main';
import {ActionCreator} from '../../reducers/reducer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class App extends React.PureComponent {
  componentDidMount() {
    const {onAppMounting} = this.props;
    onAppMounting();
  }

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
    rating: PropTypes.string.isRequired,
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
  onAppMounting: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const uniqueCities = [...new Set([...state.offers.map((offer) => offer.cityName)])];
  let citiesCoords = {};

  uniqueCities.forEach((city) => {
    if (citiesCoords[city]) {
      return;
    }
    citiesCoords[city] = state.offers.find((offer) => offer.cityName === city).cityCoords;
  });

  return Object.assign({}, ownProps, {
    city: state.city,
    offers: state.offers.filter((offer) => offer.cityName === state.city.name),
    cities: uniqueCities,
    citiesCoords,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onAppMounting: () => dispatch(ActionCreator.getOffers()),
  handleCityChange: (city) => dispatch(ActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
