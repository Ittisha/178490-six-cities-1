import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';


const cities = [`Amsterdam`, `Paris`];
const citiesCoords = {
  Amsterdam: [52.38333, 4.9],
  Paris: [48.864716, 2.349014],
};
const citiesZoom = {
  Amsterdam: 17,
  Paris: 15,
};

it(`App is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(
      <App
        apartments={OFFERS}
        city={INIT_CITY}
        cities={cities}
        citiesCoords={citiesCoords}
        onAppMounting={() => {}}
        handleCityChange={() => {}}
        isAuthorized={false}
        citiesZoom={citiesZoom}
      />);

  expect(tree).toMatchSnapshot();
});
