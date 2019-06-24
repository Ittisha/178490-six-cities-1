import * as React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsList} from './reviews-list';

const mockReviews = [
  {
    id: 1,
    user: {
      avatarUrl: ``,
      id: 1,
      isPro: false,
      name: ``,
    },
    rating: 4,
    comment: ``,
    date: ``,
  },
  {
    id: 2,
    user: {
      avatarUrl: ``,
      id: 5,
      isPro: false,
      name: ``,
    },
    rating: 5,
    comment: ``,
    date: ``,
  }
];

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewsList reviews={mockReviews} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
