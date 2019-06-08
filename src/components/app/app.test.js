import * as React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app';
import {OFFERS} from '../../mocks/offers';
import {INIT_CITY} from '../../mocks/init-city';

configure({adapter: new Adapter()});

const cities = [`Amsterdam`, `Paris`];
const citiesCoords = {
  Amsterdam: [52.38333, 4.9],
  Paris: [48.864716, 2.349014],
};

it(`App is rendered properly`, () => {
  const tree = shallow(
      <App
        offers={OFFERS}
        city={INIT_CITY}
        cities={cities}
        citiesCoords={citiesCoords}
        onAppMounting={() => {}}
        handleCityChange={() => {}}
      />);

  expect(tree).toMatchSnapshot();
});
