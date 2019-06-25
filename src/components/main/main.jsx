import * as React from 'react';
import PropTypes from 'prop-types';

import {CardList} from '../card-list/card-list';
import {CitiesMap} from '../cities-map/cities-map';
import {CityList} from '../city-list/city-list';
import {withToggleSorting} from '../../hoc/with-toggle-sorting/with-toggle-sorting';
import {Sorting} from '../sorting/sorting';
import {withActiveItem} from '../../hoc/with-active-item/with-active-item';
import {addPluralS} from '../../utils/addPluralS';
import ApartmentPropsShape from '../../props/apartment';

const SortingWithToggleAndActiveItem = withActiveItem(withToggleSorting(Sorting));

export const Main = ({apartments, city, cities, citiesCoords, handleCityChange, activeItem, setActiveItem, citiesZoom, onOptionChange}) => {
  const apartmentsCoords = apartments.map(({id, coordinates, zoom}) => ({id, coordinates, zoom}));
  const apartmentsAmount = apartments.length;
  const placeWordForm = addPluralS(apartmentsAmount, `place`);
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityList
        city={city.name}
        cities={cities}
        citiesCoords={citiesCoords}
        citiesZoom={citiesZoom}
        handleCityChange={handleCityChange}
      />
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b
              className="places__found">{`${apartmentsAmount} ${placeWordForm} to stay in ${city.name}`}</b>
            <SortingWithToggleAndActiveItem onOptionChange={onOptionChange} />
            <div className="cities__places-list places__list tabs__content">
              <CardList
                apartments={apartments}
                setActiveOffer={setActiveItem}
                cardListClass="cities__places-list tabs__content"
                cardClass="cities__place-card"
              />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <CitiesMap
                apartmentsCoords={apartmentsCoords}
                citiesZoom={citiesZoom}
                activeItem={activeItem}
                city={city}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  apartments: PropTypes.arrayOf(ApartmentPropsShape).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  citiesZoom: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  activeItem: ApartmentPropsShape,
  setActiveItem: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};
