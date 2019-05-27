import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesMap} from './cities-map';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

const mockCoords = OFFERS.map(({id, coordinates}) => ({id, coordinates}));

it(`Map component is rendered properly`, () => {
  const tree = renderer
    .create(<CitiesMap apartmentsCoords={mockCoords} initCoords={INIT_CITY.coords} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

