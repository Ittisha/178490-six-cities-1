import {ActionCreator, ActionType, reducer} from './reducer';

describe(`Reducer works correctly`, () => {
  it(`should change city`, () => {
    expect(reducer({
      city: {
        name: `Amsterdam`,
        coords: [52.38333, 4.9],
      },
      offers: []
    },
    {
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Paris`,
        coords: [48.864716, 2.349014],
      },
    })).toEqual({
      city: {
        name: `Paris`,
        coords: [48.864716, 2.349014]
      },
      offers: [],
    });
  });

  it(`should return offers`, () => {
    const reducerOutput = reducer({
      city: {
        name: `Amsterdam`,
        coords: [52.38333, 4.9],
      },
      offers: []
    },
    {
      type: ActionType.GET_OFFERS,
    });
    expect(reducerOutput.offers.length).not.toBe(0);
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return correct action for getting offers`, () => {
    expect(ActionCreator.getOffers()).toEqual({
      type: ActionType.GET_OFFERS,
    });
  });
  it(`should retutn action with city payload for changing city`, () => {
    const city = {
      name: `Amsterdam`,
      coords: [52.38333, 4.9],
    };
    expect(ActionCreator.changeCity(city)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: city,
    });
  });
});
