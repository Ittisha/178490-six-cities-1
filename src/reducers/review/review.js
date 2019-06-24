import {mapReviews} from '../../mappers/map-reviews';

export const ActionType = {
  LOAD_REVIEW_SUCCESS: `GET_REVIEWS`,
};

const INITIAL_STATE = {
  reviews: [],
};

export const ActionCreator = {
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEW_SUCCESS,
      payload: reviews,
    };
  },
};

export const Operation = {
  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(mapReviews(response.data)));
      });
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
  }

  return state;
};


