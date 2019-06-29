import * as React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from "react-router-dom";

import {SignIn} from './sign-in';
import {USER_AUTHORIZATION} from '../../mocks/user';
import {INIT_CITY} from "../../mocks/city";

it(`SignIn correctly renders`, () => {
  const tree = renderer
    .create(<StaticRouter>
      <SignIn
        onChange={() => {}}
        onSubmit={() => {}}
        onLogin={() => {}}
        formData={USER_AUTHORIZATION}
        city={INIT_CITY}
        disabled={true}
      />
    </StaticRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
