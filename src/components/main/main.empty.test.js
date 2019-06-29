import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Main} from './main';
import {INIT_CITY, MOCK_CITIES, MOCK_CITIES_ZOOM, MOCK_CITIES_COORDS} from '../../mocks/city';

it(`Main component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(
      <Main
        apartments={[]}
        city={INIT_CITY}
        cities={MOCK_CITIES}
        citiesCoords={MOCK_CITIES_COORDS}
        citiesZoom={MOCK_CITIES_ZOOM}
        handleCityChange={() => {}}
        setActiveItem={() => {}}
        onOptionChange={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
