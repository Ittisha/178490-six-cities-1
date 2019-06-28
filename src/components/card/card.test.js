import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {StaticRouter} from "react-router-dom";
import {Card} from './card';
import {OFFERS} from '../../mocks/offers';

const mockApartment = OFFERS[0];

it(`Card component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<StaticRouter>
      <Card
        apartment={mockApartment}
        onImgClick={() => {}}
        cardClass={`near-places__card`}
      />
    </StaticRouter>);

  expect(tree).toMatchSnapshot();
});
