import * as React from 'react';
import renderer from 'react-test-renderer';

import {Review} from './review';
import {mockReviews} from '../../mocks/reviews';

const mockReviewProps = mockReviews[0];

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<Review {...mockReviewProps} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
