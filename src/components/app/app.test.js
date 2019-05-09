import * as React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {APARTMENTS} from '../../consts/apartments';

it(`App is rendered properly`, () => {
  const tree = renderer
    .create(<App apartments={APARTMENTS}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
