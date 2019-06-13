import {mapOffers} from '../../mappers/map-offers';

export const ActionType = {
  LOAD_OFFERS_SUCCESS: `GET_OFFERS`,
  SWITCH_OFFERS: `SWITCH_OFFERS`,
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
};

export const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(mapOffers(response.data)));
      });
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS_SUCCESS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
  }

  return state;
};
