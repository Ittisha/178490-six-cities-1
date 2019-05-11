import * as React from 'react';
import renderer from 'react-test-renderer';
import {Card} from './card';
import {OFFERS} from '../../mocks/offers';

const mockApartment = OFFERS[0];

it(`Card component is rendered properly`, () => {
  const tree = renderer
    .create(<Card apartment={mockApartment} onImgClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
