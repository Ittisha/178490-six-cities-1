import MockAdapter from 'axios-mock-adapter';

import {mapReviews} from '../../mappers/map-reviews';
import {mockReviews} from '../../mocks/reviews';
import {createApi} from '../../api';
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer
} from './review';

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /comments`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const reviewsLoader = Operation.loadReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, mockReviews);

    return reviewsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEW_SUCCESS,
          payload: mapReviews(mockReviews),
        });
      });
  });
});

describe(`Reducer works correctly`, () => {
  it(`should return reviews`, () => {
    const reducerOutput = reducer({
      reviews: [],
    },
    {
      type: ActionType.LOAD_REVIEW_SUCCESS,
      payload: mockReviews,
    });
    expect(reducerOutput.reviews.length).not.toBe(0);
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return action with offers payload for loading offers`, () => {
    expect(ActionCreator.loadReviews(mockReviews)).toEqual({
      type: ActionType.LOAD_REVIEW_SUCCESS,
      payload: mockReviews,
    });
  });
});
