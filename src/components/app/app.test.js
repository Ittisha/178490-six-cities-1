import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';
import {
  INIT_CITY,
  MOCK_CITIES,
  MOCK_CITIES_COORDS,
  MOCK_CITIES_ZOOM,
} from '../../mocks/city';

it(`App is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(
      <App
        apartments={OFFERS}
        city={INIT_CITY}
        cities={MOCK_CITIES}
        citiesCoords={MOCK_CITIES_COORDS}
        onAppMounting={() => {}}
        handleCityChange={() => {}}
        isAuthorized={false}
        citiesZoom={MOCK_CITIES_ZOOM}
        isLoading={false}
        loadOffers={() => {}}
        checkAuthorization={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
