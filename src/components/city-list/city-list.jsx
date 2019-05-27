import * as React from 'react';
import PropTypes from 'prop-types';
import {CityLink} from '../city-link/city-link';
import {ActionCreator} from '../../reducers/reducer';
import {connect} from 'react-redux';

export class CityList extends React.PureComponent {
  render() {
    const {cities, city, handleCityChange, citiesCoords} = this.props;
    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((cityItem) => (
              <CityLink
                key={cityItem}
                city={cityItem}
                cityCoords={citiesCoords[cityItem]}
                isActive={cityItem === city}
                onLinkClick={handleCityChange}
              />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

CityList.propTypes = {
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
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
    city: state.city.name,
    cities: uniqueCities,
    citiesCoords,
  });
};


const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(ActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
