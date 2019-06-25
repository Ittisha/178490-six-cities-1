import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SortingOption} from './sorting-option';

const mockOption = {
  option: `Popular`,
  isActive: true,
};

Enzyme.configure({adapter: new Adapter()});

it(`Should pass correct sorting option on click`, () => {

  const onOptionSelect = jest.fn();
  const sortingOption = shallow(<SortingOption
    option={mockOption.option}
    isActive={mockOption.isActive}
    onOptionSelect={onOptionSelect}
  />);

  const sortingOptionUnit = sortingOption.find(`li`).first();

  sortingOptionUnit.simulate(`click`);
  expect(onOptionSelect).toHaveBeenCalledWith(mockOption.option);
});
