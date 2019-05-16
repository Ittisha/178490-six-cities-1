import * as React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';

it(`App is rendered properly`, () => {
  const tree = renderer
    .create(<App apartments={OFFERS}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
