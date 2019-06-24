import * as React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsList} from './reviews-list';
import {mockReviews} from '../../mocks/reviews';

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewsList reviews={mockReviews} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
