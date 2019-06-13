import {ActionCreator, ActionType, reducer} from './cities';

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
});

describe(`ActionCreator works correctly`, () => {
  it(`should return action with city payload for changing city`, () => {
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
