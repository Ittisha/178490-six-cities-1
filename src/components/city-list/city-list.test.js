import * as React from 'react';
import renderer from 'react-test-renderer';
import {CityList} from './city-list';
import {
  INIT_CITY,
  MOCK_CITIES,
  MOCK_CITIES_COORDS,
  MOCK_CITIES_ZOOM,
} from '../../mocks/city';

it(`CityList component is rendered properly`, () => {
  const tree = renderer
    .create(
        <CityList
          city={INIT_CITY.name}
          cities={MOCK_CITIES}
          citiesCoords={MOCK_CITIES_COORDS}
          citiesZoom={MOCK_CITIES_ZOOM}
          handleCityChange={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
