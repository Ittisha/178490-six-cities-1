import * as React from 'react';
import PropTypes from 'prop-types';
import {CityLink} from '../city-link/city-link';

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


