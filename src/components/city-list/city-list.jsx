import * as React from 'react';
import PropTypes from 'prop-types';
import {CityLink} from '../city-link/city-link';

const CityList = ({cities, city, handleCityChange, citiesCoords, citiesZoom}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityItem) => (
          <CityLink
            key={cityItem}
            city={cityItem}
            cityCoords={citiesCoords[cityItem]}
            cityZoom={citiesZoom[cityItem]}
            isActive={cityItem === city}
            onLinkClick={handleCityChange}
          />
        ))}
      </ul>
    </section>
  </div>
);

CityList.propTypes = {
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  citiesZoom: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCityChange: PropTypes.func.isRequired,
};

export {CityList};
