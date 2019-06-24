import * as React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in';
import {USER_MAPPED} from '../../mocks/user';

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<SignIn
      onChange={() => {}}
      onClick={() => {}}
      user={USER_MAPPED}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
