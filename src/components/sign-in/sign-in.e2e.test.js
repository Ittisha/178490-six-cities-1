import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SignIn} from './sign-in';
import {USER_AUTHORIZATION} from '../../mocks/user';
import {INIT_CITY} from '../../mocks/city';

Enzyme.configure({adapter: new Adapter()});

describe(`e2e SignIn component test`, () => {
  it(`City link click call submit handlers`, () => {
    const event = {preventDefault: () => {}};
    const onLogin = jest.fn();
    const onSubmit = jest.fn();

    const renderedComponent = shallow(
        <SignIn
          onChange={() => {}}
          onSubmit={onSubmit}
          onLogin={onLogin}
          formData={USER_AUTHORIZATION}
          city={INIT_CITY}
          disabled={false}
        />
    );

    const instance = renderedComponent.instance();

    instance._formRef = {
      current: {
        reset: jest.fn()
      },
    };

    const form = renderedComponent.find(`form`).first();

    form.simulate(`submit`, event);

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`should send user email and password`, () => {
    const event = {preventDefault: () => {}};
    const onLogin = jest.fn();

    const renderedComponent = shallow(
        <SignIn
          onChange={() => {}}
          onSubmit={() => {}}
          onLogin={onLogin}
          formData={USER_AUTHORIZATION}
          city={INIT_CITY}
          disabled={false}
        />
    );

    const instance = renderedComponent.instance();

    instance._formRef = {
      current: {
        reset: jest.fn()
      },
    };

    const form = renderedComponent.find(`form`).first();

    form.simulate(`submit`, event);

    expect(onLogin).toHaveBeenCalledWith(USER_AUTHORIZATION);
  });


});
