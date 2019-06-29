import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {ReviewSection} from './review-section';
import {MOCK_REVIEWS} from '../../mocks/reviews';

it(`Review correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<ReviewSection
      offerId={1}
      loadReviews={() => {}}
      reviews={MOCK_REVIEWS}
      isAuthorized={true}
    />);

  expect(tree).toMatchSnapshot();
});
