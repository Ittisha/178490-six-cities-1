import * as React from 'react';
import renderer from 'react-test-renderer';
import {Card} from './card';
import {APARTMENTS} from '../../consts/apartments';

const mockApartment = APARTMENTS[0];

it(`Card component is rendered properly`, () => {
  const tree = renderer
    .create(<Card apartment={mockApartment} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
