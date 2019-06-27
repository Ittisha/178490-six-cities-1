import * as React from 'react';
import renderer from 'react-test-renderer';

import {Sorting} from './sorting';
import {SortingOptions} from '../../consts';

it(`Sorting correctly renders`, () => {
  const tree = renderer
    .create(<Sorting
      activeItem={SortingOptions.HIGH_TO_LOW}
      isOpened={false}
      onOptionChange={() => {}}
      onSortingToggle={() => {}}
      setActiveItem={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
