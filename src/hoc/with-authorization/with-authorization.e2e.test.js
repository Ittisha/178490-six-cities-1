import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

import {withAuthorization} from './with-authorization';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithActiveItem = withAuthorization(MockComponent);
const eventMocked = {
  target: {
    name: `email`,
    value: `test`,
  }
};

it(`Wrapped component should return user`, () => {
  const component = shallow(<WithActiveItem onLogIn={() => {}}/>);
  expect(component.state().user).toEqual({email: ``, password: ``});

  component.props().onChange(eventMocked);
  expect(component.state().user).toEqual({email: `test`, password: ``});
});
