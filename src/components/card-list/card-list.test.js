import * as React from 'react';
import renderer from 'react-test-renderer';
import {CardList} from './card-list';
import {OFFERS} from '../../mocks/offers';

it(`Card component is rendered properly`, () => {
  const tree = renderer
    .create(<CardList
      apartments={OFFERS}
      setActiveItem={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
