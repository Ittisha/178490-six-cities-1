import * as React from 'react';
import renderer from 'react-test-renderer';

import {ReviewForm} from './review-form';

it(`Review form correctly renders`, () => {
  const tree = renderer
    .create(<ReviewForm
      onChange={() => {}}
      onSubmit={() => {}}
      onFormSending={() => {}}
      offerId={1}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
