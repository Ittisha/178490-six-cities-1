import * as React from 'react';
import renderer from 'react-test-renderer';
import {CityLink} from './city-link';
import {INIT_CITY} from '../../mocks/init-city';

it(`CityLink component is rendered properly`, () => {
  const tree = renderer
    .create(
        <CityLink
          city={INIT_CITY.name}
          cityCoords={INIT_CITY.coords}
          isActive={true}
          onLinkClick={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
