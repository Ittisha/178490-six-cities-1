import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesMap} from './cities-map';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

const mockCoords = OFFERS.map(({id, coordinates, zoom}) => ({id, coordinates, zoom}));

it(`Map component is rendered properly`, () => {
  const tree = renderer
    .create(<CitiesMap
      apartmentsCoords={mockCoords}
      city={INIT_CITY}
      activeItem={OFFERS[0]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

