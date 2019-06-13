import MockAdapter from 'axios-mock-adapter';

import {mapOffers} from '../../mappers/map-offers';
import {OFFER} from '../../mocks/offer';
import {OFFERS} from '../../mocks/offers';
import {createApi} from '../../api';
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './offers-data';

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [OFFER]);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_SUCCESS,
          payload: mapOffers([OFFER]),
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`should return offers`, () => {
    const reducerOutput = reducer({
      city: {
        name: `Amsterdam`,
        coords: [52.38333, 4.9],
      },
      offers: []
    },
    {
      type: ActionType.LOAD_OFFERS_SUCCESS,
      payload: OFFERS,
    });
    expect(reducerOutput.offers.length).not.toBe(0);
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return action with offers payload for loading offers`, () => {
    expect(ActionCreator.loadOffers(OFFERS)).toEqual({
      type: ActionType.LOAD_OFFERS_SUCCESS,
      payload: OFFERS,
    });
  });
});
