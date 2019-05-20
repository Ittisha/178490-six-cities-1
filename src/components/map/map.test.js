import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map';
import {OFFERS} from '../../mocks/offers';
import {INIT_COORDS} from '../../mocks/init-coords';

const mockCoords = OFFERS.map(({id, coordinates}) => ({id, coordinates}));

it(`Map component is rendered properly`, () => {
  const tree = renderer
    .create(<Map apartmentsCoords={mockCoords} initCoords={INIT_COORDS} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

