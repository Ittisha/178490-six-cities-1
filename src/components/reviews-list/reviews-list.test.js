import * as React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsList} from './reviews-list';
import {MOCK_REVIEWS} from '../../mocks/reviews';

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewsList reviews={MOCK_REVIEWS} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
