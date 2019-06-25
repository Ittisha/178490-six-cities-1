import * as React from 'react';
import renderer from 'react-test-renderer';

import {SortingOption} from './sorting-option';

const mockOption = {
  option: `Popular`,
  isActive: true,
};

it(`PlaceSortingType correctly renders`, () => {

  const onOptionSelect = jest.fn();
  const tree = renderer
    .create(<SortingOption
      option={mockOption.option}
      isActive={mockOption.isActive}
      onOptionSelect={onOptionSelect}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
