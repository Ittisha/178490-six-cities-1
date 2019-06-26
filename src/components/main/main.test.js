import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Main} from './main';
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

it(`Main component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(
      <Main
        apartments={OFFERS}
        city={INIT_CITY}
        cities={cities}
        citiesCoords={citiesCoords}
        citiesZoom={citiesZoom}
        handleCityChange={() => {}}
        setActiveItem={() => {}}
        onOptionChange={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
