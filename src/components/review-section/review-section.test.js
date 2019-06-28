import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {ReviewSection} from './review-section';
import {mockReviews} from '../../mocks/reviews';

it(`Review correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<ReviewSection
      offerId={1}
      loadReviews={() => {}}
      reviews={mockReviews}
      isAuthorized={true}
    />);

  expect(tree).toMatchSnapshot();
});
