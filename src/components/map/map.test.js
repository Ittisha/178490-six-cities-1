import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map';
import {OFFERS} from '../../mocks/offers';

const mockCoords = OFFERS.map(({id, coordinates}) => ({id, coordinates}));

it(`Map component is rendered properly`, () => {
  const tree = renderer
    .create(<Map apartment={mockCoords} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

