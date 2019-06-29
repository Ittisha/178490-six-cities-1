import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Card} from './card';
import {OFFERS} from '../../mocks/offers';

const mockApartment = OFFERS[1];

Enzyme.configure({adapter: new Adapter()});

describe(`e2e Card component test`, () => {
  it(`Image click call clickHandler`, () => {
    const clickHandler = jest.fn();
    const card = shallow(
        <Card
          apartment={mockApartment}
          onImgClick={clickHandler}
          cardClass="near-places__card"
          imageWrapperClass={`near-places__image-wrapper`}
        />
    );

    const titleButton = card.find(`.place-card__image-wrapper a`).first();
    titleButton.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it(`should send apartment on image click`, () => {
    const clickHandler = jest.fn();
    const card = shallow(
        <Card
          apartment={mockApartment}
          onImgClick={clickHandler}
          cardClass="near-places__card"
          imageWrapperClass={`near-places__image-wrapper`}
        />
    );

    const titleButton = card.find(`.place-card__image-wrapper a`).first();
    titleButton.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledWith(mockApartment);
  });
});

