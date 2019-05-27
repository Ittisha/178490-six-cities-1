import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {INIT_CITY} from '../../mocks/init-city';
import {CityLink} from './city-link';

Enzyme.configure({adapter: new Adapter()});

describe(`e2e CityLink component test`, () => {
  it(`City link click call clickHandler`, () => {
    const event = {preventDefault: () => {}};
    const clickHandler = jest.fn();
    const renderedLink = shallow(
        <CityLink
          city={INIT_CITY.name}
          cityCoords={INIT_CITY.coords}
          isActive={false}
          onLinkClick={clickHandler}
        />
    );

    const link = renderedLink.find(`a`).first();
    link.simulate(`click`, event);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it(`should send city name and coords on link click`, () => {
    const event = {preventDefault: () => {}};
    const clickHandler = jest.fn();
    const renderedLink = shallow(
        <CityLink
          city={INIT_CITY.name}
          cityCoords={INIT_CITY.coords}
          isActive={false}
          onLinkClick={clickHandler}
        />
    );

    const link = renderedLink.find(`a`).first();
    link.simulate(`click`, event);

    expect(clickHandler).toHaveBeenCalledWith(INIT_CITY);
  });
});
