import * as React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

it(`Main component is rendered properly`, () => {
  const tree = renderer
    .create(<Main apartments={OFFERS} city={INIT_CITY}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
