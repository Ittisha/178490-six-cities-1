import {INIT_CITY} from '../mocks/init-city';
import {OFFERS} from '../mocks/offers';

const INITIAL_STATE = {
  city: INIT_CITY,
  offers: [],
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

export const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
  getOffers: () => {
    return {
      type: ActionType.GET_OFFERS,
    };
  }
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});

    case ActionType.GET_OFFERS:
      return Object.assign({}, state, {offers: OFFERS});
  }

  return state;
};
