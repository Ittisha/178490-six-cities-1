import {toast} from 'react-toastify';
import {mapOffers} from '../../mappers/map-offers';
import {getRandomArrayItem} from '../../utils/getRandomArrayItem';
import {ActionCreator as CityActionCreator} from '../cities/cities';
import {SUCCESS_STATUS} from '../../consts';

const updateOffers = (offers, newOffer) => offers.map((currentOffer) => currentOffer.id === newOffer.id
  ? newOffer
  : currentOffer);

export const ActionType = {
  LOAD_OFFERS_SUCCESS: `GET_OFFERS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
};

const INITIAL_STATE = {
  offers: [],
};

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS_SUCCESS,
      payload: offers,
    };
  },
  updateOffers: (offer) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: offer,
  })
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
          const offersData = mapOffers(response.data);
          const randomOffer = getRandomArrayItem(offersData);
          const initialCity = {
            name: randomOffer.cityName,
            coords: randomOffer.cityCoords,
            zoom: randomOffer.cityZoom,
          };
          dispatch(CityActionCreator.changeCity(initialCity));
          dispatch(ActionCreator.loadOffers(mapOffers(response.data)));
          return;
        }
        toast.error(response.response.data.error);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS_SUCCESS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    case ActionType.UPDATE_OFFERS:
      return Object.assign({}, state, {
        offers: updateOffers(state.offers, action.payload),
      });
  }
  return state;
};
