import * as React from 'react';
import {OfferPage} from './offer-page';
import {OFFER_MAPPED} from '../../mocks/offer';
import {OFFERS} from '../../mocks/offers';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`OfferPage component is rendered properly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(
      <OfferPage
        offer={OFFER_MAPPED}
        nearestOffers={[OFFERS[3]]}
      />);

  expect(tree).toMatchSnapshot();
});
