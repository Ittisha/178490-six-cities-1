import * as React from 'react';
import renderer from 'react-test-renderer';
import {CityList} from './city-list';
import {INIT_CITY} from '../../mocks/init-city';

it(`CityList component is rendered properly`, () => {
  const cities = [`Amsterdam`, `Paris`];
  const citiesCoords = {
    Amsterdam: [52.38333, 4.9],
    Paris: [48.864716, 2.349014],
  };
  const citiesZoom = {
    Amsterdam: 17,
    Paris: 15,
  };
  const tree = renderer
    .create(
        <CityList
          city={INIT_CITY.name}
          cities={cities}
          citiesCoords={citiesCoords}
          citiesZoom={citiesZoom}
          handleCityChange={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
