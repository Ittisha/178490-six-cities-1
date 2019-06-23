import * as React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './main';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

configure({adapter: new Adapter()});

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
  const tree = shallow(
      <Main
        apartments={OFFERS}
        city={INIT_CITY}
        cities={cities}
        citiesCoords={citiesCoords}
        citiesZoom={citiesZoom}
        handleCityChange={() => {}}
        setActiveItem={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
