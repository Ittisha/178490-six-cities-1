import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

import {withActiveItem} from './with-active-item';


Enzyme.configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const WithActiveItem = withActiveItem(MockComponent);


it(`Wrapped component should return active item`, () => {
  const component = shallow(<WithActiveItem />);

  expect(component.state().activeItem).toEqual(null);

  component.props().setActiveItem(`test`);
  expect(component.state().activeItem).toEqual(`test`);
});
