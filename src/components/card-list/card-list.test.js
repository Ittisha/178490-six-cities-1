import * as React from 'react';
import {StaticRouter} from "react-router-dom";
import {CardList} from './card-list';
import {OFFERS} from '../../mocks/offers';
import ShallowRenderer from 'react-test-renderer/shallow';


it(`CardList component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<StaticRouter>
      <CardList
        apartments={OFFERS}
        setActiveOffer={() => {}}
        cardListClass={`near-places__list`}
        cardClass={`near-places__card`}
      />
    </StaticRouter>);

  expect(tree).toMatchSnapshot();
});
