import * as React from 'react';
import renderer from 'react-test-renderer';

import {ReviewSection} from './review-section';
import {mockReviews} from '../../mocks/reviews';

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewSection
      offerId={1}
      loadReviews={() => {}}
      reviews={mockReviews}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
