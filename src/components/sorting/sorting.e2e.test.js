import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Sorting} from './sorting';
import {SortingOptions} from '../../consts';

Enzyme.configure({adapter: new Adapter()});

const MOCK_TYPE = `POPULAR`;

it(`Sorting correctly renders`, () => {
  const onOptionChange = jest.fn();
  const onSortingToggle = jest.fn();
  const setActiveItem = jest.fn();
  const sorting = mount(<Sorting
    activeItem={SortingOptions.HIGH_TO_LOW}
    isOpened={true}
    onOptionChange={onOptionChange}
    onSortingToggle={onSortingToggle}
    setActiveItem={setActiveItem}
  />);

  const choosenType = sorting.find(`li`).first();
  choosenType.simulate(`click`);

  expect(onOptionChange).toHaveBeenCalledWith(MOCK_TYPE);
  expect(onSortingToggle).toHaveBeenCalledWith(MOCK_TYPE);
  expect(setActiveItem).toHaveBeenCalledWith(MOCK_TYPE);
});
