import {mapReviews} from '../../mappers/map-reviews';
import {toast} from 'react-toastify';

export const ActionType = {
  LOAD_REVIEW_SUCCESS: `GET_REVIEWS`,
  SEND_REVIEW: `SEND_REVIEW`,
};

const INITIAL_STATE = {
  reviews: [],
};

export const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEW_SUCCESS,
    payload: reviews,
  }),
  sendReview: () => ({
    type: ActionType.SEND_REVIEW,
  }),
};

export const Operation = {
  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.loadReviews(mapReviews(response.data)));
          return;
        }
        toast.error(response.response.data.error);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  },

  sendReview: ({id, comment, rating}) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, {
      comment,
      rating,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.loadReviews(mapReviews(response.data)));
          toast.success(`You review has been posted`);
          return;
        }
        toast.error(response.response.data.error);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

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


