import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

import {withToggleSorting} from './with-toggle-sorting';


Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withToggleSorting(MockComponent);

it(`Should save toggled state`, () => {
  const component = shallow(<MockComponentWrapped />);

  component.props().onSortingToggle();
  expect(component.state().isOpened).toEqual(true);

  component.props().onSortingToggle();
  expect(component.state().isOpened).toEqual(false);
});
