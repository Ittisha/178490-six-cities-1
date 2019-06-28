import * as React from 'react';
import renderer from 'react-test-renderer';
import {BookmarkButton} from './bookmark-button';

const MOCK_PROPS = {
  offerId: 1,
  isInBookmarks: false,
  className: ``,
  width: 15,
  height: 12,
};

it(`Bookmarks are rendered correctly`, () => {
  const tree = renderer
    .create(<BookmarkButton
      offerId={MOCK_PROPS.offerId}
      isInBookmarks={MOCK_PROPS.isInBookmarks}
      className={MOCK_PROPS.className}
      width={MOCK_PROPS.width}
      height={MOCK_PROPS.height}
      updateFavorites={() => {}}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
