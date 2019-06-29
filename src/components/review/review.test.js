import * as React from 'react';
import renderer from 'react-test-renderer';

import {Review} from './review';
import {MOCK_REVIEWS} from '../../mocks/reviews';

const mockReviewProps = MOCK_REVIEWS[0];

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<Review {...mockReviewProps} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
