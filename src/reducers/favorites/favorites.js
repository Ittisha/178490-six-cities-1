import {toast} from 'react-toastify';
import {mapOffers} from '../../mappers/map-offers';
import {ActionCreator as OffersActionCreator} from '../offers/offers-data';
import {SUCCESS_STATUS} from '../../consts';

const INITIAL_STATE = {
  favorites: [],
};

const deleteFromFavorites = (favouriteOffers, deletedOffer) => {
  return favouriteOffers.filter((currentOffer) => currentOffer.id !== deletedOffer.id);
};
const getBookmarkAction = (isInBookmarks) => isInBookmarks ? `added to` : `removed from`;

export const ActionType = {
  UPDATE_FAVORITES: `UPDATE_FAVORITES`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
};

export const ActionCreator = {
  updateFavorites: (offer) => ({
    type: ActionType.UPDATE_FAVORITES,
    payload: offer,
  }),
  loadFavorites: (favorites) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: favorites,
  }),
};

export const Operation = {
  updateFavorite: (isInBookmarks, id) => (dispatch, _getState, api) => api.post(`/favorite/${id}/${isInBookmarks}`)
    .then((response) => {
      if (response.status === SUCCESS_STATUS) {
        const data = mapOffers([response.data])[0];
        dispatch(ActionCreator.updateFavorites(data));
        dispatch(OffersActionCreator.updateOffers(data));
        toast.success(`The offer was successfully ${getBookmarkAction(isInBookmarks)} favorites`);
        return;
      }
      toast.error(response.response.data.error);
    })
    .catch((error) => {
      toast.error(error.message);
    }),

  loadFavorites: () => (dispatch, _getState, api) => api.get(`/favorite`)
    .then((response) => {
      if (response.status === SUCCESS_STATUS) {
        const data = mapOffers(response.data);
        dispatch(ActionCreator.loadFavorites(data));
        return;
      }
      toast.error(response.response.data.error);
    })
    .catch((error) => {
      toast.error(error.message);
    }),
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES: {
      return Object.assign({}, state, {
        favorites: action.payload,
      });
    }
    case ActionType.UPDATE_FAVORITES:
      return Object.assign({}, state, {
        favorites: deleteFromFavorites(state.favorites, action.payload),
      });
    default:
      return state;
  }
};

