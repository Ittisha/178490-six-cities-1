import * as React from 'react';
import renderer from 'react-test-renderer';

import {Review} from './review';

const mockReviewProps = {
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
};

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<Review {...mockReviewProps} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
