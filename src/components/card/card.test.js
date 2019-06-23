import * as React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from "react-router-dom";
import {Card} from './card';
import {OFFERS} from '../../mocks/offers';

const mockApartment = OFFERS[0];

it(`Card component is rendered properly`, () => {
  const tree = renderer
    .create(<StaticRouter>
      <Card apartment={mockApartment} onImgClick={() => {}} />
    </StaticRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
