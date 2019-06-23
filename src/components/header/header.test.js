import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from "react-router-dom";

import {Header} from './header';
import {USER_MAPPED} from '../../mocks/user';


describe(`Header component`, () => {
  it(`Header is correctly rendered`, () => {
    const header = renderer
      .create(<StaticRouter>
        <Header
          isAuthorized={true}
          user={USER_MAPPED}
        />
      </StaticRouter>)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});
