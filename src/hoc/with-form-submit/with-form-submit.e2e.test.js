import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

import {withFormSubmit} from './with-form-submit';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWithFormSubmit = withFormSubmit(MockComponent);
const eventMocked = {
  persist: () => {},
  target: {
    name: `email`,
    value: `test@tut.by`,
    form: {
      checkValidity: () => true,
    }
  }
};

it(`Wrapped component should return form data`, () => {
  const component = shallow(<MockComponentWithFormSubmit onLogIn={() => {}}/>);
  expect(component.state().dataToSend).toEqual({});

  component.props().onChange(eventMocked);
  expect(component.state().dataToSend).toEqual({email: `test@tut.by`});
});
