import * as React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import {APARTMENTS} from '../../consts/apartments';

it(`Main component is rendered properly`, () => {
  const tree = renderer
    .create(<Main apartments={APARTMENTS}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
