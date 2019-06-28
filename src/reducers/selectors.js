import {createSelector} from 'reselect';

import {NameSpace} from './reducer';
import {calculateDistance} from '../utils/calculate-distance';

export const getCity = (state) => (
  state[NameSpace.CITIES].city
);

export const getOffers = (state) => (
  state[NameSpace.OFFERS].offers
);

export const getUser = (state) => (
  state[NameSpace.USER].user
);

export const getReviews = (state) => {
  const reviews = state[NameSpace.REVIEWS].reviews;
  return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getIsAuthorized = (state) => (
  state[NameSpace.USER].isAuthorized
);

export const getOffer = (state, id) => {
  return state[NameSpace.OFFERS].offers.find((offer) => offer.id === Number(id));
};

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

export const getCitiesZoom = createSelector(
    getOffers,
    getCities,
    (offers, cities) => cities.reduce((citiesZoom, city) => {
      citiesZoom[city] = offers.find((offer) => offer.cityName === city).cityZoom;
      return citiesZoom;
    }, {})
);

export const getCityOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => {
      return offers.filter((offer) => offer.cityName === city.name);
    }
);

export const getNearestOffers = (id, number) => createSelector(
    getOffers,
    (offers) => {
      if (!offers && !offers.length) {
        return [];
      }
      const idNumber = Number(id);

      const currentOffer = offers.find((offer) => offer.id === idNumber);

      return offers
        .map((offer) => {
          offer.distance = calculateDistance(currentOffer.cityCoords[0], currentOffer.cityCoords[1], offer.cityCoords[0], offer.cityCoords[1]);
          return offer;
        })
        .sort((offer1, offer2) => offer1.distance - offer2.distance)
        .filter((offer) => offer.id !== idNumber)
        .slice(1, number + 1);
    });
