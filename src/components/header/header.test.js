import React from 'react';
import renderer from 'react-test-renderer';

import {Header} from './header';


describe(`Header component`, () => {
  it(`Header is correctly rendered`, () => {
    const header = renderer
      .create(<Header
        isAuthorizationRequired={false}
        requireAuthorizationStatus={jest.fn()}
        user={{}}
      />)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});