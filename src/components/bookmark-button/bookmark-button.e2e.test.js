import * as React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BookmarkButton} from './bookmark-button';

const MOCK_PROPS = {
  offerId: 1,
  isInBookmarks: false,
  className: ``,
  width: 15,
  height: 12,
};

Enzyme.configure({adapter: new Adapter()});

it(`Bookmarks callback is fired with correct arguments`, () => {
  const updateFavorites = jest.fn();
  const tree = shallow(<BookmarkButton
    offerId={MOCK_PROPS.offerId}
    isInBookmarks={MOCK_PROPS.isInBookmarks}
    className={MOCK_PROPS.className}
    width={MOCK_PROPS.width}
    height={MOCK_PROPS.height}
    updateFavorites={updateFavorites}
  />);

  const button = tree.find(`button`).first();
  button.simulate(`click`);

  expect(updateFavorites).toHaveBeenCalledTimes(1);
  expect(updateFavorites).toHaveBeenCalledWith(Number(!MOCK_PROPS.isInBookmarks), MOCK_PROPS.offerId);
});
