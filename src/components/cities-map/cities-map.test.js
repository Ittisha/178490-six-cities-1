import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {CitiesMap} from './cities-map';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/city';

const mockCoords = OFFERS.map(({id, coordinates, zoom}) => ({id, coordinates, zoom}));

it(`Map component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<CitiesMap
      apartmentsCoords={mockCoords}
      city={INIT_CITY}
      activeItem={OFFERS[0]}
    />);

  expect(tree).toMatchSnapshot();
});

