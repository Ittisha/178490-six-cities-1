import * as React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from "react-router-dom";
import {CardList} from './card-list';
import {OFFERS} from '../../mocks/offers';


it(`Card component is rendered properly`, () => {
  const tree = renderer
    .create(<StaticRouter>
      <CardList
        apartments={OFFERS}
        setActiveOffer={() => {}}
      />
    </StaticRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
