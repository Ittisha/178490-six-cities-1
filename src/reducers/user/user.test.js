import MockAdapter from 'axios-mock-adapter';
import {ActionCreator, ActionType, reducer, Operation} from './user';
import {createApi} from '../../api';
import {user} from '../../mocks/user';
import {mapUser} from '../../mappers/map-user';

describe(`Reducer works correctly`, () => {
  it(`should set that user is authorized`, () => {
    expect(reducer({
      isAuthorized: false,
      user: null,
    },
    {
      type: ActionType.SET_IS_AUTHORIZED,
      payload: true,
    })).toEqual({
      isAuthorized: true,
      user: null,
    });
  });
  it(`should set user data`, () => {
    expect(reducer({
      isAuthorized: false,
      user: null,
    },
    {
      type: ActionType.SET_USER_DATA,
      payload: {name: `test`},
    })).toEqual({
      isAuthorized: false,
      user: {name: `test`},
    });
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return action with user data for user data download`, () => {
    expect(ActionCreator.setUserData(user)).toEqual({
      type: ActionType.SET_USER_DATA,
      payload: user,
    });
  });

  it(`should return action with auth status`, () => {
    expect(ActionCreator.setIsAuthorized(true)).toEqual({
      type: ActionType.SET_IS_AUTHORIZED,
      payload: true,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(200, user);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_DATA,
          payload: mapUser(user),
        });
      });
  });

  it(`Should make a correct POST request to /login`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.logIn();

    apiMock
      .onPost(`/login`)
      .reply(200, user);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_DATA,
          payload: mapUser(user),
        });
      });
  });
});
