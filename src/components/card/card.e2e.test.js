import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Card} from './card';
import {APARTMENTS} from '../../consts/apartments';

const mockApartment = APARTMENTS[0];

Enzyme.configure({adapter: new Adapter()});

it(`Title click call clickHandler`, () => {
  const clickHandler = jest.fn();
  const card = shallow(
      <Card
        apartment={mockApartment}
        onClick={clickHandler}
      />
  );

  const titleButton = card.find(`.place-card__name a`).first();
  titleButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
