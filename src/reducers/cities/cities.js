import {INIT_CITY} from '../../mocks/city';

const INITIAL_STATE = {
  city: INIT_CITY,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

export const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload
      });
  }

  return state;
};
