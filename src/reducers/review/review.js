import {mapReviews} from '../../mappers/map-reviews';
import {toast} from 'react-toastify';
import {SUCCESS_STATUS} from '../../consts';

export const ActionType = {
  LOAD_REVIEW_SUCCESS: `GET_REVIEWS`,
  SEND_REVIEW: `SEND_REVIEW`,
  SET_SUBMIT_STATUS: `SET_SUBMIT_STATUS`,
  SET_HAS_SUBMIT_ERROR: `SET_HAS_SUBMIT_ERROR`,
};

const INITIAL_STATE = {
  reviews: [],
  isSubmitted: false,
  hasSubmitError: false,
};

export const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEW_SUCCESS,
    payload: reviews,
  }),
  setSubmitStatus: (status) => ({
    type: ActionType.SET_SUBMIT_STATUS,
    payload: status,
  }),
  setHasSubmitError: (status) => ({
    type: ActionType.SET_HAS_SUBMIT_ERROR,
    payload: status,
  }),
};

export const Operation = {
  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === SUCCESS_STATUS) {
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
        if (response.status === SUCCESS_STATUS) {
          dispatch(ActionCreator.loadReviews(mapReviews(response.data)));
          dispatch(ActionCreator.setSubmitStatus(true));
          dispatch(ActionCreator.setHasSubmitError(false));
          toast.success(`You review has been posted`);
          return;
        }
        dispatch(ActionCreator.setHasSubmitError(true));
        toast.error(response.response.data.error);
      })
      .catch((error) => {
        dispatch(ActionCreator.setHasSubmitError(true));
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

    case ActionType.SET_SUBMIT_STATUS:
      return Object.assign({}, state, {
        isSubmitted: action.payload,
      });

    case ActionType.SET_HAS_SUBMIT_ERROR:
      return Object.assign({}, state, {
        hasSubmitError: action.payload,
      });
  }

  return state;
};


