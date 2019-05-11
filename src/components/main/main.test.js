import * as React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import {OFFERS} from '../../mocks/offers';

it(`Main component is rendered properly`, () => {
  const tree = renderer
    .create(<Main apartments={OFFERS}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
