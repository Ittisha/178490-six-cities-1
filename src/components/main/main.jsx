import * as React from 'react';
import PropTypes from 'prop-types';

import {CardList} from '../card-list/card-list';
import {CitiesMap} from '../map/cities-map';
import {CityList} from '../city-list/city-list';
import {addPluralS} from '../../utils/addPluralS';
import {withActiveItem} from '../../hoc/with-active-item/with-active-item';

const CardListWithActiveItem = withActiveItem(CardList);

export const Main = ({apartments, city, cities, citiesCoords, handleCityChange}) => {
  const apartmentsCoords = apartments.map(({id, coordinates}) => ({id, coordinates}));
  const apartmentsAmount = apartments.length;
  const placeWordForm = addPluralS(apartmentsAmount, `place`);
  return (
    <React.Fragment>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          city={city.name}
          cities={cities}
          citiesCoords={citiesCoords}
          handleCityChange={handleCityChange}
        />
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${apartmentsAmount} ${placeWordForm} to stay in ${city.name}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high
                  </li>
                  <li className="places__option" tabIndex="0">Price: high to low
                  </li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardListWithActiveItem apartments={apartments}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <CitiesMap initCoords={city.coords} apartmentsCoords={apartmentsCoords}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

Main.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool,
    isInBookmarks: PropTypes.bool,
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  handleCityChange: PropTypes.func.isRequired,
};
