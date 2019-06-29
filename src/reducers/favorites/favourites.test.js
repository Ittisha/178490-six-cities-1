import MockAdapter from 'axios-mock-adapter';

import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './favorites';
import {createApi} from '../../api';
import {OFFER, OFFER_MAPPED} from '../../mocks/offer';
import {mapOffers} from '../../mappers/map-offers';

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [OFFER]);

    return favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_FAVORITES,
          payload: mapOffers([OFFER]),
        });
      });
  });

  it(`Should make a correct API call to /favorite/:id`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.updateFavorite(1, 1);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, OFFER);

    return favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FAVORITES,
          payload: mapOffers([OFFER])[0],
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`should return favorites`, () => {
    const reducerOutput = reducer({
      favorites: [],
    },
    {
      type: ActionType.LOAD_FAVORITES,
      payload: [OFFER_MAPPED],
    }
    );
    expect(reducerOutput.favorites.length).not.toBe(0);
  });

  it(`should update favorites`, () => {
    const reducerOutput = reducer({
      favorites: [OFFER_MAPPED],
    },
    {
      type: ActionType.UPDATE_FAVORITES,
      payload: OFFER_MAPPED,
    }
    );
    expect(reducerOutput.favorites.length).toBe(0);
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return action with favorites payload for loading favorites`, () => {
    expect(ActionCreator.loadFavorites([OFFER_MAPPED])).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: [OFFER_MAPPED],
    });
  });

  it(`should return action with offer payload for updating favorites`, () => {
    expect(ActionCreator.updateFavorites(OFFER_MAPPED)).toEqual({
      type: ActionType.UPDATE_FAVORITES,
      payload: OFFER_MAPPED,
    });
  });
});
