import * as React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

it(`App is rendered properly`, () => {
  const tree = renderer
    .create(<App offers={OFFERS} city={INIT_CITY}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
