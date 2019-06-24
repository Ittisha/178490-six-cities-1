import * as React from 'react';
import {OfferPage} from './offer-page';
import {OFFER_MAPPED} from '../../mocks/offer';
import {OFFERS} from '../../mocks/offers';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build';

configure({adapter: new Adapter()});

it(`OfferPage component is rendered properly`, () => {
  const tree = shallow(
      <OfferPage
        offer={OFFER_MAPPED}
        nearestOffers={[OFFERS[3]]}
      />);

  expect(tree).toMatchSnapshot();
});
