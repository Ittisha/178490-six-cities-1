import * as React from 'react';
import PropTypes from 'prop-types';

import {CardList} from '../card-list/card-list';
import {CitiesMap} from '../cities-map/cities-map';
import {CityList} from '../city-list/city-list';
import {withToggleSorting} from '../../hoc/with-toggle-sorting/with-toggle-sorting';
import {Sorting} from '../sorting/sorting';
import {withActiveItem} from '../../hoc/with-active-item/with-active-item';
import {addPluralS} from '../../utils/addPluralS';
import apartmentPropsShape from '../../props/apartment';
import cityPropsShape from '../../props/city';
import {
  getCities,
  getCitiesCoords,
  getCitiesZoom,
  getCity,
} from '../../reducers/selectors';
import {connect} from 'react-redux';
import {ActionCreator as CitiesActionCreator} from '../../reducers/cities/cities';

const SortingWithToggleAndActiveItem = withActiveItem(withToggleSorting(Sorting));

const Main = ({
  apartments,
  city,
  cities,
  citiesCoords,
  handleCityChange,
  activeItem,
  setActiveItem,
  citiesZoom,
  onOptionChange
}) => {
  const apartmentsCoords = apartments.map(({id, coordinates, zoom}) => ({id, coordinates, zoom}));
  const apartmentsAmount = apartments.length;
  const placeWordForm = addPluralS(apartmentsAmount, `place`);

  const isEmpty = apartments.length === 0;
  const mainEmptyClassName = isEmpty && `page__main--index-empty`;
  const placesEmptyClassName = isEmpty && `cities__places-container--empty`;

  return (
    <main className={`page__main page__main--index ${mainEmptyClassName}`}>
      <h1 className="visually-hidden">Cities</h1>
      <CityList
        city={city.name}
        cities={cities}
        citiesCoords={citiesCoords}
        citiesZoom={citiesZoom}
        handleCityChange={handleCityChange}
      />
      <div className="cities__places-wrapper">
        <div className={`cities__places-container ${placesEmptyClassName} container`}>
          {isEmpty && (
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the
                  moment in {city.name}</p>
              </div>
            </section>
          )}
          {!isEmpty && (
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
                  imageWrapperClass="cities__image-wrapper"
                />
              </div>
            </section>
          )}
          <div className="cities__right-section">
            {!isEmpty && (
              <section className="cities__map map">
                <CitiesMap
                  apartmentsCoords={apartmentsCoords}
                  citiesZoom={citiesZoom}
                  activeItem={activeItem}
                  city={city}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  apartments: PropTypes.arrayOf(apartmentPropsShape).isRequired,
  city: cityPropsShape.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  citiesCoords: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  citiesZoom: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  activeItem: apartmentPropsShape,
  setActiveItem: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  cities: getCities(state),
  citiesCoords: getCitiesCoords(state),
  citiesZoom: getCitiesZoom(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange: (city) => dispatch(CitiesActionCreator.changeCity(city)),
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
