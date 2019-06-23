import {createSelector} from 'reselect';
import {NameSpace} from './reducer';

export const getCity = (state) => (
  state[NameSpace.CITIES].city
);

export const getOffers = (state) => (
  state[NameSpace.OFFERS].offers
);

export const getUser = (state) => (
  state[NameSpace.USER].user
);

export const getIsAuthorized = (state) => (
  state[NameSpace.USER].isAuthorized
);

export const getAuthorizationError = (state) => (
  state[NameSpace.USER].error
);

export const getCities = createSelector(
    getOffers,
    (offers) => [...new Set(offers.map((offer) => offer.cityName))].slice(0, 6)
);

export const getCitiesCoords = createSelector(
    getOffers,
    getCities,
    (offers, cities) => cities.reduce((coords, city) => {
      coords[city] = offers.find((offer) => offer.cityName === city).cityCoords;
      return coords;
    }, {})
);

export const getCityOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => {
      return offers.filter((offer) => offer.cityName === city.name);
    }
);
