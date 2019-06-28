import {toast} from 'react-toastify';
import {mapOffers} from '../../mappers/map-offers';
import {ActionCreator as OffersActionCreator} from '../offers/offers-data';
import {SUCCESS_STATUS} from '../../consts';

const getBookmarkAction = (isInBookmarks) => isInBookmarks ? `added to` : `removed from`;

export const ActionType = {
  UPDATE_FAVORITES: `UPDATE_FAVORITES`,
};

export const ActionCreator = {
  updateFavorites: (offer) => ({
    type: ActionType.UPDATE_FAVORITES,
    payload: offer,
  })
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
};

