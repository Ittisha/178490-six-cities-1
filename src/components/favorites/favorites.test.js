import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {Favorites} from './favorites';
import {MOCK_FAVORITES} from '../../mocks/offers';

it(`Favorites renders correctly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(
        <Favorites
          loadFavorites={() => {}}
          favorites={MOCK_FAVORITES}
          changeCity={() => {}}
        />
    );

  expect(tree).toMatchSnapshot();
});
